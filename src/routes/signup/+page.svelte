<script lang="ts">
	import { onMount } from "svelte";
	import Input from '../__components/__input/+page.svelte'

	let username = "";
	let password = "";
	let name = "";

	let email = "";
	$: console.log(email)


	let wrong = false;
	let wrongMessage = "";
	let passwordBool = false;
	let usernameBool = false
	let loading = false

	function enterQuery(event: Event) {
		if (event.key == "Enter") {
			submit();
		}

		if (password.length != 0) {
			passwordChecker(password);
		}
	}

	function usernameChecker() {
		const usernameRegex = /^(?!\s)[a-zA-Z\d{._}]{1,17}$/

		if (!usernameRegex.test(username)) {
			usernameBool = true;
			return;
		}
		usernameBool = false;
	}

	function passwordChecker(password: string) {
		const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~ `!@#$%^&*()_\-+={[\]}\|\\:;"'<,>.?\/])[A-Za-z\d#~ `!@#$%^&*()_\-+={[\]}\|\\:;"'<,>.?\/]{6,}$/;

		if (regex.test(password)) {
			wrong=false
			passwordBool = false;
			return;
		}

		wrong = true;
		passwordBool = true;
		wrongMessage = "Password did not pass the test";
	}

	const submit = async () => {
		if (
			passwordBool ||
			usernameBool ||
			email.length == 0 ||
			name.length == 0 ||
			name.length > 20 ||
			username.length == 0 ||
			username.length > 10
		) {
			return;
		}
		loading = true
		const response = await fetch("/api/signup", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				name: name,
			}),
		});

		// (response);

		if (response.ok) {
			window.location = "/home";
		}

		if (response.status == 401) {
			wrongMessage =
				"That email/username is already in use. Please try again";
			wrong = true;
			loading = false
			// (wrong);
		}
	};
</script>

<body>
	<div id="loginForm">
		<Input prop='Email' bind:data={email} />
		<Input prop='Username' bind:data={username} />
		<Input prop='Name' bind:data={name} />

		<div id="passwordHolder">
			<Input prop='Password' type='password' bind:data={password} />
			<div id="passwordProperties">
        <span class="smallText">Min. 8 characters</span>
        <span class="smallText">Min. 1 number</span>
      </div>
		</div>

		<button class="loginButton" on:click={submit}>Sign Up</button>
	</div>
</body>

<style>
	@import '/styles.css';

  #passwordProperties {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }

  #passwordProperties span{
    color: red;
  }
</style>
