/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Asadbek
 *               lastname:
 *                 type: string
 *                 example: Haydarov
 *               email:
 *                 type: string
 *                 format: email
 *                 example: asadbek@gmail.com
 *               username:
 *                 type: string
 *                 example: asadbek
 *               password:
 *                 type: string
 *                 format: password
 *                 example: asadbek123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration failed
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     ...
 */
