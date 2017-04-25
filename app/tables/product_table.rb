class ProductTable < ModelTable::Base

  columns do
    column 'Id', :id
    column 'Name', :name
    column 'Sku', :sku
    column 'Body', :body
  end


end
