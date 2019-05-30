users = User.create(
  [
    {
      email: 'admin@bananas.com',
      password: 'bananaKing',
      password_confirmation: 'bananaKing',
      admin: true
    },
    {
      email: 'user@bananas.com',
      password: 'bananaBro',
      password_confirmation: 'bananaBro'
    }
  ]
)