<?php
$performance = sanitize("performance");
$firstname = sanitize("first_name");
$lastname = sanitize("last_name");
$studentID = sanitize("student_id");
$skill = sanitize("skill");
$instrument = sanitize("instrument");
$location = sanitize("location");
$room = sanitize("room");
$time = sanitize("time_slot");
$firstname2 = sanitize("first_name_2");
$lastname2 = sanitize("last_name_2");
$studentID2 = sanitize("student_id_2");

$data = array (
    "performance" => $performance,
    "fname" => $firstname,
    "lname" => $lastname,
    "id" => $studentID,
    "skill" => $skill,
    "instrument" => $instrument,
    "location" => $location,
    "room" => $room,
    "time" => $time,
    "fname2" => $firstname2,
    "lname2" => $lastname2,
    "id2" => $studentID2
);

$file = "data1.txt";

$content = [];
if (file_exists($file)) {
    $content = file_get_contents($file);
    $content = json_decode($content);
}

$content[] = $data;
$jString = json_encode($content);

file_put_contents($file, $jString);

function sanitize($input)
{
    if (isset($_POST[$input]))
    {
        $value = $_POST[$input];
        $value = trim($value);
        $value = stripslashes($value);
        $value = htmlspecialchars($value);
        return $value;
    }

    else
    {
        return "";
    }
}

header('Location: assign13.html');
?>
