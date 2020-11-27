const { createStore } = window.Redux;

//state
//reducer
//store
const initialState = JSON.parse(localStorage.getItem("hobbyList")) || [];

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newHobbyList = [...state];

      newHobbyList.push(action.payload);
      return newHobbyList;
    }
    default: {
      return state;
    }
  }
  return state;
};

const store = createStore(hobbyReducer);

//-----------------------

//Render redux hobby list
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;

  //reset previous content of ul
  ulElement.innerHTML = "";

  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");

    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
};

//render initial hobby list
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

//handle form submit
const hobbyFormElement = document.querySelector("#hobbyFormId");

if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    //prevent browser from reload
    e.preventDefault();
    const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");

    if (!hobbyTextElement) return;

    console.log("submit", hobbyTextElement.value);

    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    };
    store.dispatch(action);
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  console.log("STATE UPDATE: ", store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem("hobbyList", JSON.stringify(newHobbyList));
});
