class TablesChannel < ApplicationCable::Channel
  def subscribed
    @table = "#{params[:type]}Table".safe_constantize
    stream_from "table_#{params[:type]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_columns
    ActionCable.server.broadcast("table_#{params[:type]}", type: 'FETCH_COLUMNS_FULFILLED', payload: {columns: @table.columns})
  end
end
