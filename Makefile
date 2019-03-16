PROJECT_NAME=react-typescript-starter
PORT=8080

.PHONY: build
build: # build the app
	docker build -t $(PROJECT_NAME) .

.PHONY: run
run: # runs the built Docker image
	# -d stands for "detached mode"
	# -it stands for "interactive"
	# runs on port 8080 to avoid conflicts
	docker run -it -p $(PORT):80 $(PROJECT_NAME)
