# GA Project 4: Low Carbon Travel - A Django and React stack app 

### Link

[Low Carbon Travel](https://project-4-destinations.herokuapp.com/#/)

### Installation Instructions

### Brief

Working individually, I was tasked with building a full-stack application using a Python Django API, with Django REST Framework to serve data from an SQLite database, and consuming this with a separate front-end built in React. 

Key deliverables were as follows:

* Build a full-stack Python Django API and React application
* Be a complete product, requiring multiple relationships and Create Read Update and Delete (CRUD)  functionality for at least two models
* Have a visually impressive design
* Be deployed online
* Have automated tests for at least one RESTful resources on the back-end

### Technologies used

Django, Python, SQLite, React, JavaScript, Axios, Bulma, HTML5, ES6, CSS 3, SASS, Yarn, Git, Github

### Timeframe

7 days

### Overview & concept of the project

Having worked in groups for projects 2 and 3, I decided to tackle this project as a solo one, to help reinforce the full range of techniquies I had learned already throughout the course.

I took time to decide on a concept, considering several possibilities (such as a London historic buildings finder) before settling on a holiday destination app. This offered the opportunity to have visually attractive content, together with allowing me to focus on the technical aspects by having a clear and simple idea for the content. 

In order to give this a unique selling point, I decdied to focus on the emerging trend for lower carbon holidays, and as such I decided to investigate 3rd party APIs for calculating the carbon of trips. 

A mobile-first design approach was also a goal from the outset, having not had the opportunity in my previous projects to truly pursue this. My design thinking has continued to evolve towards a "less is more" approach, and I wanted to have a very clean design which was truly easy to use on mobile.

I also decided to minimise features in order to maximise the continuity of design across the site, given the timeframes in question. As discussed below, timeframes still proved to be an issue, but I consider this approach was correct in any event. 

### Approach taken

## Planning

I took time to plan the user story for the site, deciding that the user would want a simple search functionality to allow them to almost immediately start browsing holiday desinations, together with the more complex CRUD functionality once they were registered and logged in. 

I therefore centered the model design on the destination, with a many-to-one relationship between the in-built Django user model and the destination (noting that Django does not actually provide for a one-to-many relationship). I also added a further category model in a many-to-many relationship with the destination model, in order to facilitate better grouping and searching of the destinations. I spent a good amount of time researching Entity Relationship Diagrams for planning out table relationships in relational databases such as SQLite, which was a considerable difference to my previous experience with the NoSQL MongoDB.

For page design, I wanted simple effective navigation, and decided early on against having an index page of all available holidays, to then be filtered down. I wanted the use to proactively enter their requirements before seeing any results; as such I designed the search page to request key information, which the user then has to submit before returning results. Having used as-you-type dynamic filtering on my previous projects, I feel that using a form to submit information, which not necessarily looking as impressive, is often a better design solution. 

For index and show, given the mobile first approach, I wanted simple, consistently formatted text and pictures which displayed well on mobile. I decided to use Bulma to achieve this, given its in-built responsiveness and excellent formatting and spacing qualities. It also saved time, which on a time limited project like this was a real consideration. 

In order to manage the workflow of the project, I set up a Trello board with cards for discrete tasks. Unlike in previous projects I did not mark these individually using the MoSCoW methodology, as the cards represented the MVP of the project.

My research into 3rd party APIs led me to [CarbonKit.net](https://docs.carbonkit.net/), which has an excellently documented API for a whole range of carbon calculators. I decided to use their Great Circle flight methodology model which calculates the carbon for a flight between two airports, as it would allow the user to enter an easy input (the IATA code for an airport) and be returned a unique calcuaton of the carbon of their trip.

## Implementation

I commenced the project by setting up the requiste Git and Github, before moving onto the backend setup with Django. 

### Django Setup

I previously found the Model-Template-View framework of Django a little confusing, coming from the Model-View-Controller design pattern of Express, so I took my time to understand the conceptual differences, as well as the similarities. 

Having done so, I created the Django project folder, and then the destinations app within this to contain the required Django back-end content. 

I started the project using the Django Rest Framework (DRF) generic views for full REST functionality, however removed these later on when they could not provide the flexibility I required around nesting models within models. 

Nesting became a recurring problem during the implementation of the Django back-end, with problems with recursion in the serialisers when looking to nest the destinations in the user AND the user in the destinations (similarly for categories and holidays. As such, I ended up implementing different serialisers for the same models based on whether these needed to be populated with the nested models, if so ensuring there was not infinite recursion. Similarly, different serializers are used in the different views based on the RESTful route in question:

```Python

# views.py extract

 class DestinationList(APIView):

    def get(self, _request):
        destinations = Destination.objects.all()
        serializer = PopulatedDestinationSerializer(destinations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            destination = serializer.instance
            serializer = PopulatedDestinationSerializer(destination)
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        
==========================================================================
#serialisers.py extract

 class DestinationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Destination
        fields = ('id', 'name', 'airport', 'country', 'longitude', 'latitude', 'cost', 'image', 'description', 'user', 'categories',)

class PopulatedDestinationSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True, read_only=True)

    class Meta(DestinationSerializer.Meta):
        fields = ('id', 'name', 'airport', 'country', 'longitude', 'latitude', 'cost', 'image', 'description', 'categories', 'user',)
```

Once the models, views and serialisers were implemented, I then proceeded to populate the database with test data and users, using the in-built Django site administration tools and the DRF to test the back-end setup. Having to migrate when making changes to the models was a new feature compared to Express and unexpectedly time consuming when this effectively resulted in having to reseed the data; as such I found the use of a fixtures json file early on of great assistance. 

### React Setup

Having the back-end functioning and accessible through the built-in features Django and DRF, I then proceeded to hook this up to the React front end, using a separate front-end app. The project urls point to the front-end app, which in turn opens the index.html and loads the React route DOM node. This is one aspect of the project I intent to research further, as while I understand the concept of the various steps undertaken to link React to the back-end, I am uncertain over the actual implementation in places.

For the implementation of the React front-end, I built on my existing experience using components such as react-select, and the styling framework Bulma to add additional functionality and a consistant styling across the site, while avoiding a "fussy" screen with too much content and always keeping a mobile-first design approach. 

### User experience and forms

Error handling and form guidance was something I found myself focusing on in the design, as part of my desire to have a clear user experience. I also concentrated on data validation, using both back-end and front-end methods to ensure that the user could only enter valid data, and was aware of what the requirements were. 

In particular, in researching good front-end form design was extremely interested in this article:

[Don't Use the Placeholder Attribute](https://www.smashingmagazine.com/2018/06/placeholder-attribute/)

regarding placeholder text, which influenced my decision to remove placeholders and replace them with help paragraph classes, with aria-describedby used for screenreader support for the required input. I also ensured that the form labels and inputs were correctly associated, using htmlFor and id.

Examples:

```Python

# models.py - use of model validators

from django.core.validators import RegexValidator

alphanumeric = RegexValidator(r'^[A-Z]*$', 'Only capital letters are allowed.')

airport = models.CharField(max_length=3, null=True, validators=[alphanumeric])
        
==========================================================================
# DestinationNew.js - input validation

<div className="field">
     <label className="label" htmlFor="airport">Airport</label>
     <p className="help" id="airport-hint"> Enter the IATA airport code, e.g. LAX for Los Angeles International
     </p>
     <div className="control">
       <input
         id="airport"
         aria-describedby="airport-hints"
         className="input is-uppercase"
         maxLength="3"
         name="airport"
         onChange={this.handleChangeAirport}
       />
     </div>
     {this.state.errors.airport && <small className="help is-danger">{this.state.errors.airport}</small>}
 </div>
 
 ==============
 
 # DestinationSearch.js - button disabling until inputs entered
 
const isEnabled = categories.length > 0 && cost !== '' && airport !== ''

<button className="button" type="submit" disabled={!isEnabled}>Go!</button>
```

### CarbonKit API

The CarbonKit API model chosen requires a GET request containing the two IATA airport codes, which will return a range of values relating to carbon and other emissions that can then be displayed to the user. Originally I had intended for this to show on the index page of the destinations after a user had searched, and enable sorting by lowest amount, however this quickly proved complex involve batch requests for multiple airports. As such, I abandoned this approach (the correct decision in my opinion and 




### Styling

Styling was achieved primarily though the use of a Bulma template, Lux from Bulmaswatch. This was introduced by agreement early on in the project, which meant that members of the group were able to style their components with the confidence that these would not deviate signifcantly from other people's styliny. 

At the end of the project minimal tweaks were required to the overall styling to give single visual identity to the app, and this was in a large part due to the use of the template at an early stage.

As with my second project, we felt that, although there was a signficant amount of information to display, an uncluttered apporach was still best. Given the subject matter of events and enjoying yourself, we gave images prominance on the site, as these often grab a user's interest more than text. 

Parallex effects were used where we felt it added to the visual appeal of the page, such as on the Index with React-lazy-hero:
```Javascript
<LazyHero
  ransitionTimingFunction="ease-in-out" isFixed={true}
  imageSrc="https://unsplash.it/2000/1000" minHeight="10vh">
  <h1>Happening</h1>
</LazyHero>
```
The styling delivers a professional looking website, and I think suits the subject matter of the app.

### Finished product

The app at the end of the project delivered a large amount of functionality, from the ability to look up and add events to the creation of a user profile, and the ability to follow other users and see what events they were attending. This took us well past our MVP, and I am happy with the final result. 

### Wins and Blockers

#### Wins:
* The DRY nature of the Happening index page, which uses a relatively small amount of code to reuse a functional component and build the main index page. This was a specific goal from my previous project. 

* Learning how to work effectively in a group of developers and using github for version control.

* Using react-select to implement the selection of multiple categories.


#### Blockers:

* Currently the categories on the index page do not return unique results, if a happening has more than one category assigned, and so duplicates will show. 

-- Continue* 

### Future features

* Introduce the ability to search by multiple ingredients 
* A comparison function to compare cocktails
* Making the prepopulated searches use a single component. 

### Learning points (tech & soft skills)

#### Methodology
Working in a group development team was excellent practice in teamwork and communcation skills. Making decisions together and having regular standups with the team required a cooperate approach, and planning the required task using Trello cards was an invaluable aid.

#### Technical
The project allowed me to further develop my React skills, and become more comfortable with using React packages (such as React-Select), which are an excellent way to give additional functionality to an app without taking large amounts of time. 

Greater understanding of the interation between functional and classical components, together with setting state with data from axios requests before iterating over this data allowed me to solve a complex techincal challenge which was immensly satisying.


