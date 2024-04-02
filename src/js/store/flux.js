const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
				,
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			deleteContact: (indexToDelete) => {
				const store = getStore();
				console.log('deleteContact',indexToDelete)
				// console.log(store.contacts.filter( (contact,contactIndex)=> contactIndex != indexToDelete ))
				// setStore({ contacts: store.contacts.filter( (contact,contactIndex)=> contactIndex != indexToDelete ) });
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/usuarioprueba27/contacts/"+indexToDelete, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result)
						fetch('https://playground.4geeks.com/contact/agendas/usuarioprueba27/contacts')
						.then( (response)=> response.json())
						.then( (data)=> setStore({ contacts: data.contacts }))
					})
					.catch((error) => console.error(error));
			},
			loadSomeData: () => {
				console.log('loadSomeData')
				// setStore({ contacts: [
				// 	{
				// 		name: "contacto inicial 1",
				// 		email: "email desde flux 1"
				// 	},
				// 	{
				// 		name: "contacto inicial 2",
				// 		email: "email desde flux 2"
				// 	}			
				// ] });
				fetch('https://playground.4geeks.com/contact/agendas/usuarioprueba27/contacts')
				.then( (response)=> response.json())
				.then( (data)=> setStore({ contacts: data.contacts }))

				
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
