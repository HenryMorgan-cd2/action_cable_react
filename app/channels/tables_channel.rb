class TablesChannel < ApplicationCable::Channel
  def subscribed
    @table = params[:id]
    stream_from "table"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_columns
    ActionCable.server.broadcast("table", type: 'FETCH_COLUMNS_FULFILLED', payload: {columns: [@table.titleize, @table.upcase, @table.downcase]})
  end
end
