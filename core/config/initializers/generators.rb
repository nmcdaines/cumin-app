# Use uuid when generating models and migrations
# Note: when creating relations with bigint references you
#       need to remove "type: :uuid" from the migration
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
