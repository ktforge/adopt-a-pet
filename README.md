# Adopt a Pet

A pet adoption site from Codecademy's Full-Stack Engineer path. Codecademy gave me the pages and components, and my job was to wire up all the navigation with React Router v6 so the app changes pages without ever reloading.

**Live site:** https://adopt-a-pet-devante.netlify.app

## What it does

The home page lists every pet up for adoption.
Clicking Dogs, Cats, Rabbits, or Birds in the nav bar filters the list, and the link you're on gets a darker background.
Clicking a pet opens its details page at a URL like /cat/51322435.
Some pets don't have details from the shelter yet. Clicking one of those (Dottie is one of them) sends you to a 404 page with a Go Home button.
Typing a name in the search bar and pressing Enter takes you to /search?name=shuri and shows the pets that match.

The pet data comes from a fake API built with Mock Service Worker, so it runs entirely in the browser.

## How to run it

1. Install Node.js if you don't have it.
2. In this folder, run npm install.
3. Run npm start and open http://localhost:3000 in Chrome.

Try these once it's running:

/dog shows only dogs, and the heading says "dogs available for adoption near you"
/search?name=Shuri shows Shuri the cat
/pet-details-not-found shows the 404 page

## What I learned

The router lives in App.js. I wrote the routes as JSX, turned them into route objects with createRoutesFromElements, built the router with createBrowserRouter, and handed it to RouterProvider. Root holds the nav bar, and every other page shows up in its Outlet.

There are three ways to read the URL, and each page needed a different one. useParams gets :type and :id out of the path, and useSearchParams gets ?name= out of the query string. One returns an object and the other returns an array, which is why it's { type } in one file and [searchParams] in the other.

Redirecting also comes in two flavors. The details page renders a Navigate component when the API call fails, so the redirect happens on its own. The search bar and the Go Home button call the function from useNavigate, because those should only run when someone actually does something.

Most of my bugs were typos. I wrote 'react=router-dom' with an equals sign and the whole page broke with "Module not found." I also wrote Navlink with a lowercase L, and JSX treated it as a component that doesn't exist. Another time I put the useSearchParams import in the search bar file instead of the search page, because both folders are named search.

After it was live I found two more bugs. Pressing Back on the 404 page sent me straight back to the 404 page, because Back landed on the broken pet's URL and that redirected again. Adding replace to the Navigate swaps the broken URL out of the history, so Back goes home instead. The other one was the pet photos: the starter data links to old Petfinder images that don't exist anymore, so I added an onError that swaps in the placeholder picture.

For Netlify I had to add a public/_redirects file. Without it, refreshing on a page like /dog asks Netlify for a file that isn't there and you get a 404.

Built by DeVante Bush
