#How to use redux with react
#In just react, we are just updating the state of the parent components over again to reflect a change
#redux outsources this externally

Redux has three main components 
1) Redux Store, object that store the state of the application,
	a) must be declared with a reduce, can also take in middleware
2) Redux Reducer, is the collection of function object that is resposible for all of the 
 data change calculations
3) Actions, are functions called from components, that call method from within the reducer

[0 Import redux dependencies via webapack]

[1 Create actions think of the actions needed to change the state]
	a) Declare them as constants above, ready to export

		ex)
		export const ADD_INGREDIENT = 'ADD_INGREDIENT';
		export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
		export const HIGHLIGHT_TOGGLE = 'HIGHLIGHT_TOGGLE';
		export const SHOW_MODAL = 'SHOW_MODAL';
		export const HIDE_MODAL = 'HIDE_MODAL';

	b) Declare them as functions read to export, they take the componet data necessary to 
	to update the new state and a flag to idenftify the action

		ex)
		export const addIngredient = (recipeName, ingredient) => {
			return {type: ADD_INGREDIENT, recipeName: recipeName, ingredient: ingredient};
		};

		export const updateIngredient = (recipeName, oldIngredient, newIngredient) => {
			return {type: UPDATE_INGREDIENT, recipeName: recipeName, oldIngredient: oldIngredient, newIngredient: newIngredient};
		};

		export const deleteIngredient = (recipeName, ingredient) => {
			return {type: DELETE_INGREDIENT, recipeName: recipeName, ingredient: ingredient};
		};

		export const highlightToggle = (recipeName) => {
			return {type: HIGHLIGHT_TOGGLE, recipeName};
		};

		export const showModal = (action, recipe, ingredient) => {
			console.log("show modals is called")
			return {
				type: SHOW_MODAL,
				modalType: action,
				modalProps: {
					recipe: recipe,
					ingredient: ingredient
				}
			}
		}

		export const hideModal = () => {
			return {type: HIDE_MODAL};
		};		

	c) Integrate the action functions into the react component
		1) Add the action wrapper functions into the react component
			a) Import them into the react compoent file
			b) Decalre them in the constructor with bind, so it knows what object
			c) call store.dispatch(these actions)
			d) add into the render method triggers for the wrappers

		ex)
		import { combineReducers } from 'redux';
		import { ADD_RECIPE, UPDATE_RECIPE_NAME,
			DELETE_RECIPE, UPDATE_INGREDIENT, 
			ADD_INGREDIENT, DELETE_INGREDIENT,
			HIGHLIGHT_TOGGLE, SHOW_MODAL,
			HIDE_MODAL
		} from './recipeReduxActions';

		class RecipeItem extends Component {
			constructor(props) {
				super(props);
				this.addIngredientModal = this.addIngredientModal.bind(this) ;
				this.deleteRecipe = this.deleteRecipe.bind(this);
				this.updateRecipeModal = this.updateRecipeModal.bind(this);
				this.highlightToggle = this.highlightToggle.bind(this);
			}
			addIngredientModal() {
				store.dispatch(showModal('ADD_INGREDIENT', this.props.name));
			}
			deleteRecipe() {
				store.dispatch(deleteRecipe(this.props.name));
			}
			updateRecipeModal() {
				store.dispatch(showModal('UPDATE_RECIPE_NAME', this.props.name));
			}
			highlightToggle() {
				store.dispatch(highlightToggle(this.props.name));
			}
			render() {
				const {ingredients, name} = this.props;
				var ingredientNodes = ingredients.map(ingredient => 
						<IngredientItem ingredient={ingredient} key={Date.now().toString()} recipe={name} />
				);
				return (
					<div className = "recipeBlock" onClick={this.highlightToggle}>
						<div className = "titleBar" onClick={this.updateRecipeModal}>
							Recipe Name
							{name}
						</div>
						<div className = "ingredientList">
							Recipe Ingredients
							{ingredientNodes}
						</div>
							Recipe Buttons
						<button onClick={this.addIngredientModal}> Add Ingredient </button>
						<button onClick={this.deleteRecipe}> Delete Recipe </button>
					</div>
				)
			}
		};

		RecipeItem.propTypes = {
			ingredients: PropTypes.array.isRequired,
			name: PropTypes.string.isRequired
		};				
				
[2 Implement the reducer Logic]
	
	(a) Create regular js functions in a separate file to help change the data
		(at will) It takes a current state and an input and the nreturns a new state in some way
			Worst case it will return an original state

	(b) Integrate these regular functions into a reducer
		a) Import the action function and reducer libraries
		b) Implement the reducer logic
		*The reducer is the Core logic of a data change
		*Reduce takes in previous state, an action object, and returns a new state
		*there should be no modification of the original state, new objects should be returned

  	ex)
		function recipeBoxReducer(state =  {recipes: []}, action) {
			var newState = _.cloneDeep(state);
			switch (action.type) {
				case ADD_RECIPE:
					newState.recipes.push({
						name: action.recipeName,
						ingredients: [],
						active: true
					});
					return newState;

				case UPDATE_RECIPE_NAME:
					var recipeIndex = indexFinder(state.recipes, action.oldRecipeName);
					if (recipeIndex > -1) {
						newState.recipes[recipeIndex].name = action.newRecipeName;
						return newState;
					}
					else {
						console.log("recipe does not exist");
						return state;
					}

				case DELETE_RECIPE:
					var recipeIndex = indexFinder(state.recipes, action.recipeName);
					if (recipeIndex > -1) {
						newState.recipes.splice(recipeIndex, 1);
						return newState;
					}
					else {
						console.log("recipe does not exist");
						return state;
					}

				case ADD_INGREDIENT:
					var recipeIndex = indexFinder(state.recipes, action.recipeName);
					if (recipeIndex > -1) {
						newState.recipes[recipeIndex].ingredients.push(action.ingredient);
						return newState
					}
					else {
						console.log("recipe does not exist");
						return state;
					}

[3 Declare store and integrate redux into a react application]

	a) combine all reducers into a single reducer, and export it to react file

		ex)
		const recipeReducer = combineReducers({
			modalReducer,
			recipeBoxReducer
		});

		export default recipeReducer	

	b) Declare a redux component with takes in thr root react component

		ex)
		var DynamicRecipeBox = connect(
			function mapStateToProps(state) {
				return {appState: state};
			},
			function mapDispatchToProps(dispatch) {
				return {
					addRecipe: recipe => dispatch(addRecipe(recipe));
				}
			}
		)(RecipeBox)

	(Optional Create middelware)

		ex)
		const logger = store => next => action => {
			console.log('dispatching', action);
			let result = next(action);
			console.log('next state', store.getState());
			return result;
		}

		const crashReporter = store => next => action => {
			try {
				return next(action)
			} catch (err) {
				console.error('Caught an exception!', err)
				throw err;
			}

	c) Declare the Store with the reducer and middleware 

		ex)
		let store = createStore(recipeReducer, applyMiddleware(logger, crashReporter))	

	d) Set store to the data source for the react application, and attack redux/react
		element to a dom object to load it into the HTML

		ex)
		ReactDOM.render(
			<Provider store={store}>
				<DynamicRecipeBox />
			</Provider>,
			document.getElementById('content')
		);	

