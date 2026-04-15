-- =========================
-- DEFAULT DATA
-- =========================
INSERT INTO role (id, name) VALUES
(1, 'Employee'),
(2, 'Officer'),
(3, 'Admin');


INSERT INTO users (id, first_name, middle_name, last_name, email, password, role_id) VALUES
(1, 'John', 'Allister', 'Doe', 'admin.dev@infinetsolutionsph.com', 'e4abae53cc1cebe5fe89ea93882c699a5e71ab0bbf42a83b7d833975b61c4a41', 3),
(2, 'Jane', 'Marie', 'Smith', 'officer.dev@infinetsolutionsph.com', 'eab0ecabe9f7bd1305bf7d1143a7c8ee33d85d1bb06649e5e498db012f6524f6', 2),
(3, 'Alice', 'Grace', 'Johnson', 'employee.dev@infinetsolutionsph.com', '614d83fb28660621a01845a6c67c853b401d3bee31974d03433db829b30f5c2d', 1);
