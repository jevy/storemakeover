###
# Auto generated teardown pages
###

data.teardowns.drop(1).each do |teardown|
  proxy "/#{teardown.slug}.html", "single.html", locals: { 
    slug: teardown.slug,
    title: teardown.title,
    youtube_id: teardown.youtube_id,
    previous_teardowns: data.teardowns.select{ |t| t.title != teardown.title }
  }, ignore: true
end

###
# Amazon S3 Sync
###

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'www.storemakeover.co'   # The name of the S3 bucket you are targetting. This is globally unique.
  s3_sync.region                     = 'us-east-1'              # The AWS region for your bucket.
  s3_sync.delete                     = true                     # We delete stray files by default.
  s3_sync.after_build               = true
end

###
# Live Reload
###

configure :development do
  activate :livereload
end

###
# Others
###

# Directory Indexes (Pretty Links)
activate :directory_indexes

# Build-specific configuration
configure :build do
  # Use relative URLs
  activate :relative_assets
end