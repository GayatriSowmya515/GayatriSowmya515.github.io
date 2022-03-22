// JS code to load projects from details.json
function loadProjects(projects){
    // first fetch project details
    // console.log(projects)
  
    projects.forEach(function(project){
        
        fetchProject(project.url).then(function(proj_details){
                var project_code = generate_project_code(project, proj_details)
                insertProject(project_code)
                    })
       
       
    })

}

function fetchProject(url) {
    
    url = url.slice(0, 8) + "api." + url.slice(8,18) + "/repos" + url.slice(18);
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            var project = {
                name: data.name,
                description: data.description,
            }
            // console.log(project)
            return project     
        })
        .catch(error => console.log(error));
}

function generate_project_code(project, proj_details,i){
    // console.log(proj_details)
    // console.log(project)
    // console.log(i)
    var github_svg = "M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,"
                    +"7.86-9.66c0-2.45-0.5-4.39-1.48-5.9c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39"+
                        "-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61C18.1,13.46,16.42,12,"+
                        "14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,"+
                        "9.66c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74"+
                        "-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,"+
                        "14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4S44,12.95,44,24z";

    var project_code = `<div class="myprojects__project-${project.s_no} project${project.s_no}" 
                        data-aos="fade-up" data-aos-easing="ease-in-out"
                        data-aos-duration="800" data-aos-offset="150">
                            <div class="myprojects__project-${project.s_no}--header p-header project${project.s_no}-header">
                                ${proj_details.name}
                            </div>
                            <div    class="myprojects__project-${project.s_no}--img project${project.s_no}-img" 
                                    style="background: url(${project.img}); 
                                    background-size: cover;">
                            </div>
                            <div class="myprojects__project-${project.s_no}--description project${project.s_no}-description">
                                ${proj_details.description}
                                <div class="github">
                                    <a href="${project.url}" aria-label="GitHub">
                                        <svg    fill=" #C4C4C4" xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 48 48" width="33px"
                                                height="33px">
                                                <title>
                                                    GitHub
                                                </title>
                                                <path d=${github_svg} />
                                        </svg>
                                    </a>
                                </div>
                            </div>
</div>`
    return project_code
}

function insertProject(project_code){
    var div = document.getElementById('myprojects')
    div.innerHTML += project_code
}

// JS code to load social media from details.json

async function loadProfiles(profiles){
    try
    {
        logos = await fetchLogos()
        profiles.forEach(function(profile){
            code = generate_profile_code(profile, logos[profile.title])
            insertProfile(code)
            
        })
    }
    catch(error) { // (*)
        alert("Could not load Profiles!!, Check console for error");
        console.log(error); // (*)
    };
   

}

async function fetchLogos() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    logos = JSON.parse(xhr.responseText);
                    resolve(logos)
                } 
                else {
                   
                    reject(new Error("social_profiles.json not found"));
                }
            }
        };
        xhr.open("GET", "additional_files/social_logos.json", true);
        xhr.send();
    });

    
}

function generate_profile_code(profile, logo){
    profile["lower_title"] = profile.title.toLowerCase()
    var profile_code = `<div class="sicons-${profile.lower_title}" data-scroll>
                        <a  href        = "${profile.url}" 
                            aria-label  = "${profile.title}">
                            <svg    fill="#dddddd" xmlns="http://www.w3.org/2000/svg" 
                                    viewBox ="${logo.viewBox}" 
                                    width   ="${logo.width}" 
                                    height  ="${logo.height}">
                                <title>
                                    ${profile.title}
                                </title>
                                <path   id = "logo"
                                        d  = "${logo.d}" 
                                />
                            </svg>
                        </a>
                    </div>`
    // console.log(profile_code)
    return profile_code
}

function insertProfile(batch){
    var div = document.getElementById('social_profiles')
    div.innerHTML += batch
}

// JS code to load skills from details.json

async function loadSkills(user_skills){
    try
    {
        skills_json = await fetchSkills()
        var i = 1
        user_skills.forEach(function(skill){
            code = generate_skill_code(skills_json[skill],i)
            insertSkill(code)
            i++
            
        })
    }
    catch(error) { // (*)
        alert("Could not load Skills!!, Check console for error");
        console.log(error); // (*)
    };
}

function generate_skill_code(skill,i){
    var skill_code = `<div class="myskills__icons-${i} icon">
        <a href = "${skill.website}" target = "_blank">
            <img    src     = "${skill.logo_path}" alt="${skill.website}" 
                    title   = "${skill.description}"
                    class   = "skill_img"
                    >
        </a>
    </div>`
    // console.log(profile_code)
    return skill_code
}

function insertSkill(code){
    var div = document.getElementById('myskills__icons')
    div.innerHTML += code
}

async function fetchSkills() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    logos = JSON.parse(xhr.responseText);
                    resolve(logos)
                } 
                else {
                   
                    reject(new Error("social_profiles.json not found"));
                }
            }
        };
        xhr.open("GET", "additional_files/skills.json", true);
        xhr.send();
    });

    
}

// JS code to load resume from details.json

function loadResume(resume_url){
    var a = document.getElementById('resume')
    a.href = resume_url

    var a = document.getElementById('nav_resume')
    a.href = resume_url
}
