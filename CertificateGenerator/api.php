<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class CertificateAPI {
    private $studentData = [];
    private $csvFile = 'student-data.csv';
    
    public function __construct() {
        $this->loadStudentData();
    }
    
    private function loadStudentData() {
        if (!file_exists($this->csvFile)) {
            return;
        }
        
        $handle = fopen($this->csvFile, 'r');
        if ($handle !== false) {
            $headers = fgetcsv($handle);
            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) === count($headers)) {
                    $this->studentData[] = array_combine($headers, $data);
                }
            }
            fclose($handle);
        }
    }
    
    private function findStudent($studentId) {
        foreach ($this->studentData as $student) {
            if ($student['student_id'] === $studentId) {
                return $student;
            }
        }
        return null;
    }
    
    private function validateStudentId($studentId) {
        // Validate student ID format: YYYY-X-XX-XXX
        return preg_match('/^\d{4}-\d-\d{2}-\d{3}$/', $studentId);
    }
    
    public function generateCertificate($studentId) {
        if (!$this->validateStudentId($studentId)) {
            return [
                'success' => false,
                'error' => 'Invalid student ID format. Please use format: YYYY-X-XX-XXX'
            ];
        }
        
        $student = $this->findStudent($studentId);
        if (!$student) {
            return [
                'success' => false,
                'error' => 'Student ID not found in our records. Please check your ID or contact support.'
            ];
        }
        
        // Create certificates directory if it doesn't exist
        $certificatesDir = 'certificates';
        if (!is_dir($certificatesDir)) {
            mkdir($certificatesDir, 0755, true);
        }
        
        // Generate certificate using Python script
        $outputFile = $certificatesDir . '/certificate_' . $studentId . '.png';
        $command = "python3 certificate_generator.py --student-id " . escapeshellarg($studentId) . " --output " . escapeshellarg($certificatesDir) . " 2>&1";
        
        $output = shell_exec($command);
        
        if (file_exists($outputFile)) {
            return [
                'success' => true,
                'student_name' => $student['name'],
                'certificate_url' => $outputFile,
                'message' => 'Certificate generated successfully!'
            ];
        } else {
            return [
                'success' => false,
                'error' => 'Failed to generate certificate. Please try again later.',
                'debug' => $output
            ];
        }
    }
    
    public function downloadCertificate($studentId) {
        $filePath = 'certificates/certificate_' . $studentId . '.png';
        
        if (!file_exists($filePath)) {
            http_response_code(404);
            echo json_encode(['error' => 'Certificate not found']);
            return;
        }
        
        $fileName = 'Certificate_' . $studentId . '_' . date('Y-m-d') . '.png';
        
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        header('Content-Length: ' . filesize($filePath));
        
        readfile($filePath);
    }
}

// Handle API requests
$api = new CertificateAPI();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['action'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing action parameter']);
        exit();
    }
    
    switch ($input['action']) {
        case 'generate':
            if (!isset($input['student_id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing student_id parameter']);
                exit();
            }
            
            $result = $api->generateCertificate($input['student_id']);
            echo json_encode($result);
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
            break;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['download'])) {
    if (!isset($_GET['student_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing student_id parameter']);
        exit();
    }
    
    $api->downloadCertificate($_GET['student_id']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
