const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(`${API_URL}` + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			registerUser: async (data) => {
				let response = await fetch(`${process.env.BACKEND_URL}/sign-up`, {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(data),
				});
				if (response.ok) {
				  let data = response.json();
				  localStorage.setItem("token", data.token);
				  return true;
				} else return false;
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
