task reset_all: :environment do

  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke

  c = Category.create(name: 'clothing')
  c.products.create(sku: 'a-hat', name: 'Awesome Hat', description: 'This is a great hat.', published: true)
  c.products.create(sku: 'b-coat', name: 'Brilliat Coat', description: 'Its warm and a coat.', published: true)
  c.products.create(sku: 'c-i-have-a-shu', name: 'Cool Shoe', description: 'But one get the other', published: true)
  c.products.create(sku: 'jesus-jumper', name: 'Hole lot of jumper', description: 'The holes are a feature', published: false)


  c = Category.create(name: 'cars')
  c.products.create(sku: 'car1', name: 'CAR!', description: 'definitiely a car', published: false)
  c.products.create(sku: 'cart2', name: 'CARRRR!!!!', description: 'nearly a car', published: true)
  c.products.create(sku: 'carton3', name: 'MILK!', description: 'not a car', published: true)

  c = Category.create(name: 'electronics')
  c.products.create(sku: 'kbm2w', name: 'compoennt', description: 'its all shiny', published: true)
  c.products.create(sku: 'kbm3w', name: 'compoentn', description: 'its not shiny', published: true)
  c.products.create(sku: 'b4ijg', name: 'compenent', description: 'its a little shiny', published: false)
  c.products.create(sku: '43nry', name: 'compcompt', description: 'its kind of shiny', published: false)

  Category.create(name: 'houses')
  c.products.create(sku: 'detachted', name: 'A detached house', description: 'No houses on any side', published: true)
  c.products.create(sku: 'semi', name: 'neibourghly', description: 'Hope you like them', published: true)
  c.products.create(sku: 'terrace', name: 'medium house', description: 'row row row the house', published: true)
  c.products.create(sku: 'enclosed', name: 'bad house', description: 'houses on all sides', published: false)
  c.products.create(sku: 'mansion', name: 'big house', description: 'too much 5 you', published: true)



end
