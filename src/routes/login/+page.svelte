<script>
	export let form;
</script>

<section class="h-screen">
	<div class="container mx-auto px-6 py-12 h-full">
		<div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
			<div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
					class="w-full"
					alt="Phone"
				/>
			</div>
			<div class="md:w-8/12 lg:w-5/12 lg:ml-20">
				<h1 class="my-8">Login page</h1>
				<!-- error -->
				{#if form?.error}
					<label for="credentials" class="unstyled text-2xl text-red-500 pb-4">
						<!-- Credenciales incorrectas. Por favor, Intente nuevamente. -->
						{form.error}
					</label>
				{/if}
				<form action="?" method="POST">
					<!-- Email input -->
					<div class="mb-6">
						<input
							type="text"
							name="email"
							id="email"
							class="form-control block w-full px-4 py-2 text-xl font-normal bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:border-blue-600 focus:outline-none"
							placeholder="Email address"
						/>
					</div>

					<!-- Password input -->
					<div class="mb-6">
						<input
							type="password"
							name="password"
							id="password"
							class="form-control block w-full px-4 py-2 text-xl font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:border-blue-600 focus:outline-none"
							placeholder="Password"
						/>
					</div>

					<div class="flex justify-between items-center mb-6">
						<div class="form-group form-check">
							<label class="form-check-label inline-block text-white">
								<input
									type="checkbox"
									class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
									checked
								/>
								Remember me
							</label>
						</div>
						<a
							href="#!"
							class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
							>Forgot password?</a
						>
					</div>

					<!-- Submit button -->
					<button
						type="submit"
						class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
