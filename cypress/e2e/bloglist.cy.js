describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Nawal',
      username: 'nawal',
      password: '123456'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  //test opeining front page
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('nawal')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Nawal logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('nawal')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('html').should('not.contain', 'Nawal logged in')
    })
  })


  describe('when logged in', function () {

    beforeEach(function() {
      cy.login({ username: 'nawal', password: '123456' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a test blog title')
      cy.get('#blog-author').type('test author')
      cy.get('#blog-url').type('www.test.com')
      cy.get('#add-blog-button').click()
      cy.contains('a new blog a test blog title added!')
    })

    it('blogs are ordered by likes', function () {
      //initializing blogs
      cy.createBlog({
        title: 'blog with most likes',
        author: 'auth',
        url: 'url',
        likes: 10
      })
      cy.createBlog({
        title: 'blog with third most likes',
        author: 'auth',
        url: 'url',
        likes: 2
      })
      cy.createBlog({
        title: 'blog with second most likes',
        author: 'auth',
        url: 'url',
        likes: 5
      })
      cy.visit('')

      cy.get('.blog').eq(0).should('contain', 'blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'blog with second most likes')
      cy.get('.blog').eq(2).should('contain', 'blog with third most likes')
    })


    describe('when blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another cypress note',
          author: 'cypress author',
          url:'cypress url'
        })
      })

      it('a blog can be liked', function () {
        cy.contains('another cypress note cypress author')
          .contains('view')
          .click()

        cy.contains('another cypress note cypress author')
          .contains('like')
          .click()
      })

      it('a blog can be deleted by its user', function () {
        cy.contains('another cypress note cypress author')
          .contains('view')
          .click()

        cy.contains('another cypress note cypress author')
          .contains('remove')
          .click()

        cy.contains('blog another cypress note deleted!')
      })

      it('a blog can not be deleted by anyone', function () {
        //creating new user
        const user = {
          name: 'test',
          username: 'test',
          password: 'test'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)


        //logging in
        cy.login({ username: 'test', password: 'test' })

        cy.contains('another cypress note cypress author')
          .contains('view')
          .click()

        cy.contains('another cypress note cypress author')
          .contains('remove')
          .should('not.exist')
      })
    })
  })
})