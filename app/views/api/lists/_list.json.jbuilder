json.extract! list, :id, :title, :ord

json.cards list.cards do |card|
  json.partial! 'api/cards/card', card: card
end
