-- Task 1: Insert Tony Stark record
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Task 2: Modify Tony Stark record to change account_type to "Admin"
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Task 3: Delete the Tony Stark record
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- Task 4: Modify GM Hummer description using REPLACE
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Task 5: Use an inner join to select Sport category items
SELECT inv_make, inv_model, classification_name
FROM public.inventory i
INNER JOIN public.classification c 
    ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Task 6: Update all image paths to include /vehicles/
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');