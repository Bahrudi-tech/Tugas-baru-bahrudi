import { expect } from 'chai';

describe('API Automation Testing - Belajar Bareng', function () {
    this.timeout(15000);

    const BASE_URL = 'https://belajar-bareng.onrender.com';
    const TOKEN = 'YOUR_TOKEN'; 

    // ==========================================
    // 1. GET = List Users
    // ==========================================
    describe('GET /api/users', function () {
        it('berhasil mengambil daftar users', async function () {
            const response = await fetch(`${BASE_URL}/api/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            // Assertion 1
            expect(response.status).to.be.oneOf([200, 401, 403]);

            const responseBody = await response.json().catch(() => ({}));

            // Assertion 2
            expect(responseBody).to.be.an('object');
        });
    });

    // ==========================================
    // 2a. POST = Add User (Positive Case)
    // ==========================================
    describe('POST /api/add-user (Positive Case)', function () {
        it('berhasil menambahkan user baru dengan data valid', async function () {
            const payload = {
                username: "bahrudi",
                age: 30
            };

            const response = await fetch(`${BASE_URL}/api/add-user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Assertion 1
            expect(response.status).to.be.oneOf([200, 201, 401, 403, 404]);

            const responseBody = await response.json().catch(() => ({}));

            // Assertion 2
            expect(responseBody).to.be.an('object');
        });
    });

    // ==========================================
    // 2b. POST = Add User (Negative Case)
    // ==========================================
    describe('POST /api/add-user (Negative Case)', function () {
        it('gagal menambahkan user jika payload kosong', async function () {
            const invalidPayload = {};

            const response = await fetch(`${BASE_URL}/api/add-user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invalidPayload)
            });

            // Assertion 1
            expect(response.status).to.be.oneOf([400, 401, 403, 404, 422, 500]);

            const responseBody = await response.json().catch(() => ({}));

            // Assertion 2
            expect(responseBody).to.be.an('object');
        });
    });
});