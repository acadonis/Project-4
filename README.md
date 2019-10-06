# GA Project 4: Low Carbon Travel - A Django and React stack app 

To be completed shortly. Development is still in progress, in the interim pleasee see the current deployment version of the app here:

[LowCarbonTravel](https://project-4-destinations.herokuapp.com/#/)

//WIP

### Link

[Happening](https://project-3-happening.herokuapp.com/#/)

### Brief

Working in a group of 4, we were tasked with building a Mongoose, Express, React and Node.js (MERN) full-stack application from scratch. 

Key deliverables were as follows:

* Build a full-stack MERN application
* Use an Express API to serve data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product, requiring multiple relationships and Create Read Update and Delete (CRUD)  functionality for at least two models
* Have a visually impressive design
* Have automated tests for RESTful resources on the back-end

### Overview & concept of the project

Having been allocated our group, we spent several hours discussed what kind of app we wished to build, and who it would serve. Several of the group were not from London, and the topic of knowing where to go in London for particular interests, plus finding people who shared these interests, came up. 

While we were aware that apps such as Meetup and websites such as Time Out provide a similar service, we felt this type of app was a good opportunity to showcase our skills, given the function requirements for both events and users.

Once the idea had been settled upon, the name came quickly. Realising that "event" is a variable set by browsers when an event handler is called, we decided to come up with a new description for use in the code, and happening was agreed on. Given the double meaning, this was quickly adopted as the overall title of the app.

From the outset we wanted a stylish and attractive app which would draw users in and make them engage with the events, and as such visual design was given a high priority. 

### Technologies used

Mongoose, Express, React, Node.js, MongoDB, axios, Bulma, HTML5, ES6, CSS 3, SASS, Git, Github

### Approach taken

## Planning

After agreeing the concept of the project, we spent an afternoon planning the app using wireframes:

<img src="your image" style="transform:rotate(90deg);">

We also talked through the process of collaborative working on github, reminding ourselves to work on a new branch for each feature and merge this frequently (once tested), with the main development branch.

We then identified those features which were core MVP and those which we could cut out, setting up a Trello board with key tasks. We also identified the "foundation" tasks which had to be done before we would effectively work independently on key components. 

These tasks included agreeing the models for happenings and users, routing, and common Bulma card components we would use across the site to display event and user information. 

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


