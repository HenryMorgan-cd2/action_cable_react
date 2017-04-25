class Product < ApplicationRecord
  scope :published, (-> { where(published: true) })
  belongs_to :category

end
