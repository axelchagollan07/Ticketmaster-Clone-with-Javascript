<?php
// Configura la conexión con la base de datos
$host = "localhost";
$usuario = "root"; // reemplaza con tu usuario de MySQL
$contrasena = "Emm4nu3l2016$"; // reemplaza con tu contraseña de MySQL
$bd = "ticketmaster"; // reemplaza con tu base de datos

$conn = new mysqli($host, $usuario, $contrasena, $bd);

// Verifica conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Conexión fallida: " . $conn->connect_error]));
}

// Lee los datos JSON recibidos
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $stmt = $conn->prepare("INSERT INTO boletos (nombre_usuario, tipo_evento, fecha, hora, ubicacion, cantidad, metodo_pago, precio, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt) {
        $stmt->bind_param(
            "sssssisds",
            $data["nombre_usuario"],
            $data["tipo_evento"],
            $data["fecha"],
            $data["hora"],
            $data["ubicacion"],
            $data["cantidad"],
            $data["metodo_pago"],
            $data["precio"],
            $data["telefono"]
        );

        if ($stmt->execute()) {
            $id_boleto = $conn->insert_id; // <-- este es el ID recién insertado
            echo json_encode(["success" => true, "id_boleto" => $id_boleto]);
        } else {
            echo json_encode(["success" => false, "error" => "Error al ejecutar: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Error al preparar la consulta"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos JSON no válidos"]);
}

$conn->close();
?>
