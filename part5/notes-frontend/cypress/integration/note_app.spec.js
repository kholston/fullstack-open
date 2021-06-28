describe('Note App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testUser',
      password: 'userPassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function(){
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function(){
    cy.contains('login').click()
  })

  it('user can login', function(){
    cy.contains('login').click()
    cy.get('#username').type('testUser')
    cy.get('#password').type('userPassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged-in')
  })

  describe('when logged in', function(){
    beforeEach(function(){
      // cy.contains('login').click()
      // cy.get('#username').type('testUser')
      // cy.get('#password').type('userPassword')
      // cy.get('#login-button').click()

      // cy.request('POST','http://localhost:3001/api/login', {
      //   username: 'testUser', password: 'userPassword'
      // }).then(response => {
      //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000')
      // })
      cy.login({ username: 'testUser', password: 'userPassword' })
    })

    it('a new note can be created', function(){
      cy.contains('new note').click()
      cy.get('#noteInput').type('a note created by cypress')
      cy.get('#noteFormSubmit').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function(){
      beforeEach(function(){
        // cy.contains('new note').click()
        // cy.get('#noteInput').type('another note cypress')
        // cy.get('#noteFormSubmit').click()
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function() {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')

      })
    })
  })

  it.only('login fails with wrong password', function(){
    cy.contains('login').click()
    cy.get('#username').type('testUser')
    cy.get('#password').type('wrong password')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Test User logged in')
  })
})