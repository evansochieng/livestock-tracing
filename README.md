# Livestock Tracing System

### Project Description
This is a system that allows for the traceability of livestock, identifying which animals come from areas where forests are being deforested in order to plant pastures for the animals. 

The analysis is based on the following:
 
- Location of the animals (latitude, longitude, owner of the animals)
- Areas of deforestation (latitude, longitude, deforestation area or change of coverage)
 
With this information, the government will be able to identify the livestock that is in areas at risk of deforestation and carry out educational campaigns to prevent tree felling and implement other solutions.

---

### MVP
1. Map display of livestock and deforestation areas. 
2. Identification of livestock at risk based on selected risk buffer.
3. Download functionality of details of livestock at risk for use in campaigns.
4. Summary statistics of analysis for quick decision making on campaigns.

---

### Project Guide - Running the Containers
1. Install Docker: Ensure Docker is installed in your system. You can find installation guides at: https://docs.docker.com/get-docker/
2. Download or clone **docker-compose.yml** from the root directory of this repository.
3. Modify **docker-compose.yml**: modify the file and provide your own database connection details (username and password). Additionally, adjust the values of the environment variables (in **.env** file) to match your own database connection details.
4. Pull Docker Images: The images are hosted in Docker Hub at: https://hub.docker.com/repositories/evanso.    
   Open the terminal and run the following command to pull the Docker images (**livestock-tracing-backend** and **livestock-tracing-frontend**) from Docker Hub.
5. Run Containers: Run the containers using the docker-compose up command: 
**docker-compose up -d**
6. Access the Application.    
   The frontend will be accessed at: http://localhost:3000   
   The backend will be accessed at: http://localhost:5000

---

### Navigating the application
- The home page is the landing page.
- Navigate to the **Trace Livestock** page.    
- Select the risk buffer. Risk buffer is the distance from the deforestation area which you consider area of risk. The default is 100.
- The livestock at risk are displayed with a **red icon** while the safe livestock are displayed with a **green icon**. The deforested areas are displayed using a **greyish circle marker**.
- On the **Campaigns** page there are summary statistics for the livestock at risk and those not at risk.
- A user can be able to download CSV files which is not limited to the details of livestock at risk and those at risk only.

---