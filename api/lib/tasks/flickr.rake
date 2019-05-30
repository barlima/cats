namespace :flickr do
  desc 'Rake task to get cats pictures'

  task fetch: :environment do
    
    API_KEY = ENV['FLICKR_API_KEY']
    SECRET = ENV['FLICKR_SECRET']


    FlickRaw.api_key = API_KEY
    FlickRaw.shared_secret = SECRET

    puts "[#{Time.now}] -> FETCHING KITTIES"

    cats = flickr.photos.search tags: "cat", per_page: 20, min_upload_date: 1.days.ago

    cats.each do |cat|
      Cat.create(
        flickr_id: cat["id"],
        flickr_owner: cat["owner"],
        title: cat["title"],
        secret: cat["secret"],
        farm_id: cat["farm"],
        server_id: cat["server"]
      )
    end
  end
end
