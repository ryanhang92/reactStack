#How to use redux with react
#In just react, we are just updating the state of the parent components over again to reflect a change
#redux outsources this externally

Redux has three main components 
1) Redux Store, object that store the state of the application,
	a) must be declared with a reduce, can also take in middleware
2) Redux Reducer, is the collection of function object that is resposible for all of the 
 data change calculations
3) Actions, are functions called from components, that call method from within the reducer


<0 Import redux dependencies via webapack>


<1 Create Reducer Logic>
	
	(a) Create regular js functions in a separate file to help change the data
		(at will)

	(b) Integrate these regular functions into a reducer
		*The reducer is the Core logic of a data change
		*It takes in a previous state and returns a new state, but they key is that
		*there should be no modification of the original state, new objects should be returned


(Integrate redux into the react application)
<2a Create action functions to call from the components>

	<2b add and call actions from components ! The patterns are a bit different here>


<3 Declare store and integrate redux into a react application

	a) Declare functions in component to dispatch to store
		Component event actions should dispatch actions to the react store

	b) Component check events shoudl call these dispatch wrapper functions

	c) Create a redux compoent with the connect function
		with map state and dispatch to props and a regular react component passed in

	(Create middle ware)

	d) delcare with redux store, with the reduceres and middleware 

	e) Attach the redux component to the app with

	reactDOM.render(
		a) Set the Provider compoent to the store 
		b) The redux component
		c) attach to HTML document


	(integrating middleware is optional)


