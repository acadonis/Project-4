# GA Project 4: Low Carbon Travel - A Django and React stack app 

### Link

[Low Carbon Travel](https://project-4-destinations.herokuapp.com/#/)

### Brief

Working individually, I was tasked with building a full-stack application using a Python Django API, with Django REST Framework to serve data from an SQLite database, and consuming this with a separate front-end built in React. 

Key deliverables were as follows:

* Build a full-stack Python Django API and React application
* Be a complete product, requiring multiple relationships and Create Read Update and Delete (CRUD)  functionality for at least two models
* Have a visually impressive design
* Be deployed online
* Have automated tests for at least one RESTful resources on the back-end

### Technologies used

Django, Python, SQLite, React, JavaScript, Bulma, HTML5, ES6, CSS 3, SASS, Yarn, Git, Github

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

I therefore centered the model design on the destination, with a many-to-one relationship between the in-built Django user model and the destination. I also added a further category model in a many-to-many relationship with the destination model, in order to facilitate better grouping and searching of the destinations. I spent a good amount of time researching Entity Relationship Diagrams for planning out table relationships in relational databases such as SQLite, which was a considerable difference to my previous experience with the NoSQL MongoDB.

For page design, I wanted simple effective navigation, and decided early on against having an index page of all available holidays, to then be filtered down. I wanted the use to proactively enter their requirements before seeing any results; as such I designed the search page to request key information, which the user then has to submit before returning results. Having used as-you-type dynamic filtering on my previous projects, I feel that using a form to submit information, which not necessarily looking as impressive, is often a better design solution. 

For index and show, given the mobile first approach, I wanted simple, consistently formatted text and pictures which displayed well on mobile. I decided to use Bulma to achieve this, given its in-built responsiveness and excellent formatting and spacing qualities. It also saved time, which on a time limited project like this was a real consideration. 

In order 

Trello - MVP

## Implementation

We commenced by working together as a group, building the models to be used, agreeing routing and other basic requirements for the app. Once completed, we built a barebones front-end to check that we had a full-stack application working. 

After this initial start, we split the building of the app into independent tasks and listed these on our Trello board, utilising a MoSCoW categorisation for must have, should have, could have and won't have. 

My main contribution to the build were the new happenings create page and the main index page displaying the happenings. 

### New happening create page

The new happening create page is a key part of the site, allowing users to create a new happenings. As we had decided a happening could belong to more than one category, I implemented a react-select input control to achieve this.


```Javascript
 <div className="field">
   <label className="label">Category</label>
   <Select
     value= {selectedCategories}
     options={categories}
     isMulti
     onChange={this.handleCategoryChange}
   />
   {this.state.errors.categories && <small className="help is-danger">{this.state.errors.categories}</small>}
 </div>
 
=========================================
                
handleCategoryChange(selectedCategories) {
    const formData = { ...this.state.formData, categories: selectedCategories ? selectedCategories.map(option => option.value) : [] }
    this.setState({ formData })
}
```

This resulted in a change to the category property of the happening model from a string to an array of strings to incorporate the { label: categories, value: categories } structure required by react-select. As this was a change to the underlying models I ensured I talked through this change with other members of the team so they were aware of it.  

Users are required to be logged into the site to create a happening, and a Toastify warning presents if they try to proceed when not logged in, together with a redirect to the login or register page:

```Javascript
<SecureRoute path="/happenings/new" component={HappeningNew} />
      
============================================
      
router.route('/happenings/')
  .get(happeningsController.index)
  .post(secureRoute, happeningsController.create)
============================================
const SecureRoute = (props) => {
  if(Auth.isAuthenticated()) return <Route {...props} />
  toast.error('You need to log in to perform this action')
  return <Redirect to="/login" />
}
```
## Happening Index Page

The Happening index page was required to have 5 sections of happenings grouped by categories, with two larger event placeholders and three smaller ones. The layout of the section was relatively straightforward, using components with Bulma card classes, however the challenge was to adhere to DRY principles and avoid duplication of code.

To this end I built an index section functional component, which was used by the main index classical component to generate the 5 sections. Firstly the intial axios get was sliced, to return results in 5 categories, and then these results were further sliced to return 5 happenings per category. 

Once set to state, the results are mapped over in the render and spread to the Happening index section, which produces the required layout per category. 

```Javascript
componentDidMount() {
    axios.get('/api/happenings')
      .then(res => {
        const results = categories.slice(0,5).map(category => {
          return {
            name: category.value,
            happenings: res.data.filter(happening => happening.categories.includes(category.value)).slice(0,5)
          }
        })
        this.setState({ results })
      })
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          {!this.state.results && <h2 className="title is-2">Loading...</h2>}
          {this.state.results && this.state.results.map((result, i) =>
            <div key={i}>
              <HappeningIndexSection
                {...result}
              />
              <LazyHero
                ransitionTimingFunction="ease-in-out" isFixed={true}
                imageSrc="https://unsplash.it/2000/1000" minHeight="10vh">
                <h1>Happening</h1>
              </LazyHero>
            </div>
          )}
        </div>
      </section>
    )
  }
```

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


