#!/usr/bin/env ruby
# frozen_string_literal: true

require "csv"
require "json"

input_path = File.expand_path("../config/price-list.csv", __dir__)
output_path = File.expand_path("../config/price-list.js", __dir__)

rows = CSV.read(input_path, headers: true)
last_category = nil
last_model = nil

entries = rows.each_with_object([]) do |row, result|
  category_cell = row["category"]&.strip
  model_cell = row["model"]&.strip
  service = row["service"]&.strip
  price = row["price"]&.strip

  if category_cell && !category_cell.empty?
    last_category = category_cell
    last_model = nil if model_cell.nil? || model_cell.empty?
  end

  last_model = model_cell if model_cell && !model_cell.empty?

  category = (category_cell && !category_cell.empty?) ? category_cell : last_category
  model = (model_cell && !model_cell.empty?) ? model_cell : last_model

  next if [category, model, service].any? { |value| value.nil? || value.empty? }

  result << {
    category: category,
    model: model,
    service: service,
    price: price || ""
  }
end

File.write(output_path, "window.ISERVICE_PRICE_LIST = #{JSON.generate(entries)};\n")
