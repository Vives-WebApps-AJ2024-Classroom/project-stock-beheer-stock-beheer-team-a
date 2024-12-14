INSERT INTO LogAanpassing (id, gebruikersId, moment, bestellingsId, querry, projectId) VALUES
(1, 1, '2024-12-13 09:15:00', 1, 'UPDATE bestellingen SET status = ''betaald'' WHERE id = 1', 1),
(2, 2, '2024-12-13 09:45:00', 2, 'INSERT INTO bestellingen (klantId, datum) VALUES (5, ''2024-12-13'')', 1),
(3, 3, '2024-12-13 10:00:00', NULL, 'DELETE FROM klanten WHERE id = 10', NULL),
(4, 4, '2024-12-13 10:30:00', 3, 'UPDATE bestellingen SET status = ''verzonden'' WHERE id = 3', 2),
(5, 1, '2024-12-13 11:00:00', NULL, 'UPDATE projecten SET budget = budget + 500 WHERE id = 1', 1),
(6, 2, '2024-12-13 11:30:00', 4, 'INSERT INTO bestellingen (klantId, datum) VALUES (8, ''2024-12-13'')', 2),
(7, 3, '2024-12-13 12:00:00', NULL, 'DELETE FROM projecten WHERE id = 3', 3),
(8, 4, '2024-12-13 12:30:00', 5, 'UPDATE bestellingen SET status = ''geannuleerd'' WHERE id = 5', 2),
(9, 1, '2024-12-13 13:00:00', NULL, 'INSERT INTO projecten (naam, startdatum) VALUES (''Project X'', ''2024-12-15'')', NULL),
(10, 2, '2024-12-13 13:30:00', NULL, 'UPDATE projecten SET status = ''afgerond'' WHERE id = 2', 2);