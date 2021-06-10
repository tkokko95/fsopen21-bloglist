describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'test',
            password: 'test',
            name: 'test'
        }
        const user2 = {
            username: 'test2',
            password: 'test2',
            name: 'test2'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/users', user2)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown, the toggle button is working', function () {
        cy.contains('Log in').click()
        cy.contains('LOGIN')
        cy.contains('name:')
        cy.contains('password:')
        cy.contains('Login')
        cy.contains('cancel')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Log in').click()
            cy.get('input:first').type('test')
            cy.get('input:last').type('test')
            cy.contains('Login').click()
            cy.contains('Logged in as test')
        })

        it('fails with wrong credentials', function () {
            cy.contains('Log in').click()
            cy.get('input:first').type('wrongtest')
            cy.get('input:last').type('wrongtest')
            cy.contains('Login').click()
            cy.contains('Incorrect username or password')

        })
    })

    describe('When logged in', function () {
        beforeEach(async function () {
            const loginResponse = await cy.request('POST', '/api/login', {
                username: 'test',
                password: 'test'
            })
            const token = `Bearer ${loginResponse.body.token}`

            const blog1 = {
                title: 'Some Blog',
                author: 'This should be third',
                url: 'dummy',
                likes: 2
            }
            const blog2 = {
                title: 'Some Other Blog',
                author: 'This should be first',
                url: 'dummy',
                likes: 4
            }
            const blog3 = {
                title: 'One More Blog',
                author: 'This should be second',
                url: 'dummy',
                likes: 3
            }
            await cy.request({
                url: '/api/blogs',
                method: 'POST',
                body: blog1,
                headers: {
                    Authorization: token
                }
            })
            await cy.request({
                url: '/api/blogs',
                method: 'POST',
                body: blog2,
                headers: {
                    Authorization: token
                }
            })
            await cy.request({
                url: '/api/blogs',
                method: 'POST',
                body: blog3,
                headers: {
                    Authorization: token
                }
            })
            cy.wait(500)
        })

        it('Blogs can be created, liked and deleted', function () {
            cy.contains('Log in').click()
            cy.get('input:first').type('test')
            cy.get('input:last').type('test')
            cy.contains('Login').click()
            cy.contains('Submit blog').click()
            cy.get('.titleField').type('Test title')
            cy.get('.authorField').type('Test author')
            cy.get('.urlField').type('Test URL')
            cy.get('.blogSubmitButton').click()
            cy.wait(1000)
            cy.contains('Added: Test title by Test author')
            cy.contains('Test title Test author')
            cy.contains('Test title Test author').find('button').click()
            cy.contains('Like').click()
            cy.contains('Likes: 1')
            cy.contains('Delete').click()
            cy.wait(1000)
            cy.contains('Test title Test author').should('not.exist')
        })
    })
})
