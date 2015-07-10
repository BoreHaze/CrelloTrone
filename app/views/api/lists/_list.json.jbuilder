json.extract! list, :id, :title, :ord

json.array! list.cards do |card|
  json.partial! 'api/cards/card', card: card
end
