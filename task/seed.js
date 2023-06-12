const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const dis = data.diseases;
const user = data.users;
const post = data.posts;
const comment = data.comments;
const ObjectId  = require('mongodb').ObjectId;


async function main() {
  const db = await dbConnection.connectToDb();
  await db.dropDatabase();

  try {
    let newDisease1 = await dis.createDisease(
      "Tuberculosis",
      "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes. Once rare in developed countries, tuberculosis infections began increasing in 1985, partly because of the emergence of HIV, the virus that causes AIDS. HIV weakens a person's immune system, so it can't fight the TB germs. In the United States, because of stronger control programs, tuberculosis began to decrease again in 1993. But it remains a concern. Many tuberculosis strains resist the drugs most used to treat the disease. People with active tuberculosis must take many types of medications for months to get rid of the infection and prevent antibiotic resistance.",
      ["Bad cough that lasts 3 weeks or longer","Coughing up blood or sputum (mucus from deep inside the lungs)","Chest pain","Fever","Fatigue","Loss of appetite","Unintended weight loss","Chills","Night sweats"],
      ["The best way to prevent getting a tuberculosis infection is to avoid being in close contact with a person who has active TB disease.",
      "There is a vaccine against tuberculosis. It’s used in countries where TB is common. It’s not often used in the United States because the chances of being infected with TB are low.",
      "Tuberculosis is treated with antibiotic medicine. The medicine(s) your doctor recommends will depend on many factors. These include your age, your health, whether your TB is active or latent, and whether your TB is drug resistant. This means that certain medicines won’t work on it." ,
      "Don’t drink alcohol or take acetaminophen (one brand name: Tylenol) while taking TB medicines. Alcohol and acetaminophen can increase the risk of liver problems. Always check with your doctor before you take any other medicine. Some medicines interact with TB medicines and can cause side effects.",
      "Cover your mouth and nose with a tissue any time you cough, sneeze, or laugh. Put the tissue in a closed bag before you throw it away.",
      "Avoid close contact with other people.",
      "Sleep in a bedroom by yourself. Air out the room often so the bacteria don’t stay in the room.",
      "Stay home from work or school until your doctor says it’s okay to return.", 
    ],
    ["isoniazid (INH)",
      "rifampin (RIF)",
      "ethambutol (EMB)",
      "pyrazinamide (PZA)"],
    ["TB","Tuberculosis","Tuber","Active TB Disease","Miliary TB","Latent TB Infection","Phthisis"," scrofula","Active Tuberculosis","struma","pulmonary","Miliary Tuberculosis","Latent Tuberculosis","cough","disease"]

      );
    let newDisease2 = await dis.createDisease(
      "Diabetes",
      "Diabetes is a chronic disease that occurs either when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces. Insulin is a hormone that regulates blood sugar. Hyperglycaemia, or raised blood sugar, is a common effect of uncontrolled diabetes and over time leads to serious damage to many of the body's systems, especially the nerves and blood vessels. In 2014, 8.5% of adults aged 18 years and older had diabetes. In 2019, diabetes was the direct cause of 1.5 million deaths and 48% of all deaths due to diabetes occurred before the age of 70 years. Between 2000 and 2016, there was a 5% increase in premature mortality rates (i.e. before the age of 70) from diabetes. In high-income countries the premature mortality rate due to diabetes decreased from 2000 to 2010 but then increased in 2010-2016. In lower-middle-income countries, the premature mortality rate due to diabetes increased across both periods. By contrast, the probability of dying from any one of the four main noncommunicable diseases (cardiovascular diseases, cancer, chronic respiratory diseases or diabetes) between the ages of 30 and 70 decreased by 18% globally between 2000 and 2016.",
      ["Extreme hunger.",
      "Extreme thirst.",
      "Frequent urination.",
      "Unexplained weight loss.",
      "Fatigue or drowsiness.",
      "Blurry vision.",
      "Slow-healing wounds, sores, or bruises.",
      "Dry, itchy skin.",
      "Tingling or numbness in the hands or feet.",
      "Frequent or recurring skin, gum, bladder, or vaginal yeast infections."],
      
      ["Exercising and maintaining a healthy weight can reduce your risk of diabetes. Any amount of activity is better than none. Try to exercise for 30 to 60 minutes most days of the week. Always talk with your doctor before starting an exercise program.",
        " A diet high in fat, calories, and cholesterol increases your risk of diabetes. A poor diet can lead to obesity (another risk factor for diabetes) and other health problems. A healthy diet is high in fiber and low in fat, cholesterol, salt, and sugar. Also, remember to watch your portion size. How much you eat is just as important as what you eat.",
       "Your diet should include lots of complex carbohydrates (such as whole grains), fruits, and vegetables. It’s important to eat at least 3 meals per day and never skip a meal. Eat at about the same time every day. This helps keep your insulin or medicine and sugar levels steady. Avoid empty calories, such as foods high in sugar and fat, or alcohol.",
       "Exercising helps your body use insulin and lower your blood sugar level. It also helps control your weight, gives you more energy, and is good for your overall health. Exercise also is good for your heart, your cholesterol levels, your blood pressure, and your weight. These are all factors that can affect your risk of heart attack and stroke. Talk with your doctor about starting an exercise program.",
       "Losing excess weight and maintaining a healthy body weight will help you in 2 ways. First, it helps insulin work better in your body. Second, it will lower your blood pressure and decrease your risk for heart disease.",
       " If your diabetes can’t be controlled with diet, exercise, and weight control, your doctor may recommend medicine or insulin. Most people who have type 2 diabetes start with an oral medicine (taken by mouth). Oral medicines can make your body produce more insulin. They also help your body use the insulin it makes more efficiently. Some people need to add insulin to their bodies with insulin injections, insulin pens, or insulin pumps. Always take medicines exactly as your doctor prescribes. Oral medicine doesn’t work for everyone. It isn’t effective in the treatment of type 1 diabetes.",
      "The longer your diabetes is uncontrolled, the more damage you do to your health. That’s why treatment is important at any age. Keeping blood sugar levels very close to the ideal can minimize, delay, and in some cases even prevent the problems that diabetes can cause.",
      "Avoid tobacco use – smoking increases the risk of diabetes and cardiovascular disease."
    ],
    ["regular insulin (Humulin and Novolin)",
      "insulin aspart (NovoLog, FlexPen, Fiasp)",
      "insulin glulisine (Apidra)",
      "insulin lispro (Humalog)",
      "insulin isophane (Humulin N, Novolin N)",
      "insulin degludec (Tresiba)",
      "insulin detemir (Levemir)",
      "insulin glargine (Lantus)",
      "insulin glargine (Toujeo)"
    ],
    ["Diabetes",
    " type 1 diabetes ",
    " type 2 diabetes",
    " blood sugar ",
    " blood glucose",
    " Prediabetes",
  "diabetics",
"insulin",
"insulin dependent","disease"]

      );
    let newDisease3 = await dis.createDisease(
      "Epilepsy",
      "Epilepsy is a disorder of the brain. People who have epilepsy have electrical activity in the brain that is not normal, causing seizures. There are different types of seizures. In some cases, a seizure may cause jerking, uncontrolled movements, and loss of consciousness. In other cases, seizures cause only a period of confusion, a staring spell, or muscle spasms. Epilepsy is also called a “seizure disorder.” Epilepsy is not a mental illness, and it is not a sign of low intelligence. It is also not contagious. Seizures do not normally cause brain damage. Between seizures, a person with epilepsy is no different from anyone else.",
       ["Generalized tonic-clonic (grand mal) seizures",
       "Absence (or petit mal) seizures",
       "Partial (focal) seizures",
      "Aura in vision",
    "Unusual Anxiety",
  "deja vu",
  "extreme happiness",
  "a rising sensation in the abdomen"
],
      
      [
"Stay calm.",
"Don’t move the person to another place.",
"Don’t try to keep the person from moving or shaking.",
"Don’t try to wake the person by shouting at or shaking them.",
"Remove items that could cause injury if the person falls or bumps into them.",
"Gently turn the person on his or her side so any fluid in the mouth can safely come out.",
"Never try to force the person’s mouth open or put anything in it.",
"Place something soft (such as a pillow) under his or her head.",
"Most seizures aren’t life-threatening. You don’t need to call a doctor or an ambulance unless the person isn’t known to have epilepsy or unless the seizure lasts longer than 5 minutes.",
"When the seizure is over, watch the person for signs of confusion.",
"Allow the person to rest or sleep if he or she wishes."
      ],
    ["Oxymazetol",
      "Levipil XR 1000,500,250",
      "Oxymazetola",
      "Frisium",
    "Rivotril"],
    ["Epilepsy","seizures","Convulsive seizures","convolutions","convolution","seizure","convulsion","stroke","attack","fit","collapse","paroxysm","tremor","contortion","stress","mental","brain","nervous system","disease"]

      );
    let newDisease4 = await dis.createDisease(
      "Skin Cancer",
      "Skin cancer is the most common form of cancer in the United States. Almost all skin cancers are the result of too much exposure to ultraviolet light. This is found in sunlight, tanning booths, and sunlamps. Skin cancer is usually one of the most curable types of cancer. Basal cell carcinoma and squamous cell carcinoma are two of the most common forms of skin cancer. They are very curable. These cancers occur in the basal and squamous cell layers at the top of the skin. They are almost always slow-growing. If found early, they are easy to treat and do not spread.Melanoma is a less common but aggressive form of skin cancer. It occurs in skin cells that make a skin color pigment called melanin. If it is not found early, it will likely spread to other tissues. It can spread through the whole body and may cause death. Only 2% of skin cancer cases are melanoma. But it causes the most deaths from skin cancer.",
       ["A for asymmetry – Mole is not symmetrical. This means it’s not the same on both sides. If it was folded in half, the two halves wouldn’t match.",
       "B for border –Edges of the mole are blurry or jagged.",
       "C for color – Changes in the color of a mole. This could be darkening, loss of color, spreading color, or multiple colors.",
       "D for diameter – A mole more than ¼ inch in diameter.",
       "E for evolving – Mole looks different from others or is changing in shape, size, or color.",
       "A mole that itches or bleeds.",
       "A fast-growing mole.",
       "A scaly or crusted growth on the skin.",
       "A sore that won’t heal.",
       "A patch of skin that has changed color."],
      
      ["Avoid the sun.",
      "Use sunscreen.",
      "Wear a wide-brimmed hat, protective clothing, and sunglasses.",
      "Don’t try to get a tan.",
      "Protect your kids from sunburns.",
      "Continue checking your skin. Call  your doctor if you see changes.",
      "Eat a healthy diet, get plenty of sleep, and try to keep your energy up by staying active."
      ],
    ["Radiation",
      "Chemotherapy",
      "Biological therapy",
      "Targeted therapy",
    "Cryotherapy"],
    ["skin cancer","cancer","skin","Basal cell carcinoma.","carcinoma",
    "Melanoma","Squamous cell carcinoma","Allergy","Skin Allergy","Germs",
    "skin rashes","rashes","dark spots","spots","itching","disease"]

      );
    let newDisease5 = await dis.createDisease(
      "ACL Injury",
      "ACL refers to the anterior cruciate ligament. It is 1 of 4 ligaments in your knee. The other knee ligaments are PCL (posterior cruciate ligament), MCL (medial collateral ligament), and LCL (lateral collateral ligament). The ACL is located behind the kneecap (patella). It stabilizes the knee when it rotates. The ACL and PCL connect your thigh bone (femur) to your shin bone (tibia). An ACL injury is the overstretching or tearing of the ACL ligament. A torn ACL is a common knee injury. On average, women are 2 to 8 times more at risk of ACL injuries than men. Teenagers also are getting ACL injuries at an increased rate, probably because more kids are involved in organized sports. The increase in ACL injuries is also due to more awareness and advanced testing.",
       ["The primary sign of an ACL injury is a popping noise. This is often combined with pain and swelling",
       "You could experience grinding feelings of your bones or kneecap",
       "Another sign is not being able to put weight on your leg. People with a mild ACL injury might feel like their knee is unstable, or like it might “give out” when they are using it.",
       "If you are moving and quickly stop or change directions and you feel the Knee Pain",
       "Swelling that starts immediately (but can start four to six hours after the injury) and lasts for two to four weeks",
       "Loss of range of motion in your knee.",
       "Tenderness.",
      "Discomfort when you walk."],
      
      ["After surgery you’ll need to keep your wound clean and dry. You’ll use ice to reduce swelling and pain. You may use a brace and crutches",
        "You’ll have physical therapy to strengthen your knee and the muscles around it. The first few days following surgery, you’ll perform gentle range-of-motion and simple strengthening exercises, and some weight-bearing exercises. Physical therapy will start within the first week, including advanced strengthening and balance activities.",
       "After about 12 to 16 weeks, if you’re not an athlete, sport-specific activities are added to the rehabilitation program, such as hopping, jumping and agility drills. An athlete should be able to return to normal activity about six to nine months after the ACL surgery.",
       "Putting a brace around your knee will keep it stable. You’ll have to use crutches so that you don’t put weight on that leg.",
       "Physical therapy: Exercises will help your knee function and strengthen the leg muscles around it, supporting it",
       "If you play soccer, basketball and volleyball, you should be especially mindful of two things: how you take hard, quick steps to accelerate in another direction (or “cut”) and how you land on your feet from a jump or a step (“plant”)."
      ],
    [
      "Oxycodone/acetaminophen –10 mg/325 (Percocet®) Take as directed for pain (with food)",
      "Hydrocodone/acetaminophen – 5 mg/325 (Norco®) ",
      "Oxycodone Hydrochloride –10 mg (OxyContin®)",
      "Oxycodone – 5mg.",
      "Promethazine (Phenergan®)",
      "Zolpidem (Ambien®) ",
      "Ondansetron (Zofran®)"],
    ["arthroscope","ACL","anterior cruciate ligament","Ligament","ligament Tear","tear","Tissue Tear","Knee Pain","Knees","bones","Tenderness","tendon","reconstruct","ACL Reconstruction"]

      );
    let newDisease6 = await dis.createDisease(
      "Hypertension",
      "High blood pressure (hypertension) is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.",
       ["Most people with high blood pressure have no signs or symptoms, even if blood pressure readings reach dangerously high levels.",
        "A few people with high blood pressure may have headaches, shortness of breath or nosebleeds",
        "The above signs and symptoms aren't specific and usually don't occur until high blood pressure has reached a severe or life-threatening stage."],
      
      ["Current guidelines recommend that all people, including those with hypertension, engage in at least 150 minutesTrusted Source of moderate-intensity, aerobic exercise every week, or 75 minutes per week of high-intensity exercise.",
        "Avoiding or learning to manage stress can help a person control blood pressure.",
       "Reducing salt intake, moderating alcohol consumption, and eating more fruits and vegetables and less fat."
      ],
    ["Thiazides",
      "Chlorthalidone",
      "indapamide",
      "beta-blockers",
    "alpha-blockers",
  "vasodilators",
"angiotensin-converting enzyme (ACE) inhibitors",
"angiotensin receptor blockers"
],
    ["hypertension","high blood pressure","stress","pressure","tension","Hyper","blood Pressure","sleep","no sleep","disease"]

      );

    let newDisease7 = await dis.createDisease(
      "Heart Disease",
      "The term “heart disease” refers to several types of heart conditions. The most common type of heart disease in the United States is coronary artery disease (CAD), which affects the blood flow to the heart. Decreased blood flow can cause a heart attack. ",
       ["Chest pain","chest tightness","chest pressure","and chest discomfort (angina)","Shortness of breath","Pain, numbness, weakness or coldness in your legs or arms if the blood vessels in those parts of your body are narrowed","Pain in the neck, jaw, throat, upper abdomen or back"],
      
      ["Don't smoke.",
      "Control other health conditions, such as high blood pressure, high cholesterol and diabetes.",
      "Exercise at least 30 minutes a day on most days of the week.",
      "Eat a diet that's low in salt and saturated fat.",
      "Maintain a healthy weight.",
      "Reduce and manage stress.",
      "Practice good hygiene."
      ],
    ["Anticoagulants",
      "Antiplatelet therapies",
      "Angiotensin-converting enzyme inhibitors",
      "Angiotensin-converting enzyme inhibitors",
      "Beta-blockers",
      "Calcium channel blockers",
      "Cholesterol-lowering medications",
      "Cholesterol-lowering medications",
      "Digitalis",
      "Diuretics",
      "Vasodilator"
      ],
    ["heart disease","heart attack","arrhythmia","heart failure","attack","heart","fainted","cardiovascular disease","arrest","cardiac arrest","chest pains","coronary","coronary infarction","stroke","disease"]

      );

    let newDisease8 = await dis.createDisease(
      "Asthma",
      "Asthma is a chronic (long-term) disease of the lungs. It inflames and narrows the airways, making it harder to breathe. These are tubes that carry air into and out of your lungs. It most often starts in childhood but can affect people of all ages.The airways of people who have asthma are extra sensitive to the things they’re allergic to (allergens). They are also sensitive to certain substances that can be inhaled through the air.Asthma symptoms start when irritants cause the lining of the airways to become inflamed (swollen) and narrow. The muscles around the airways can then spasm (contract rapidly). This causes the airways to narrow even more. When the lining of the airways is inflamed, it produces more mucus. The mucus clogs the airways and further blocks the flow of air. When these symptoms are severe and not easily controlled, it’s called an 'asthma attack.'",      
       ["Airway blockage: When you breathe as usual, the bands of muscle around your airways are relaxed, and air moves freely. But when you have asthma, the muscles tighten. It’s harder for air to pass through.",
       "Inflammation: Asthma causes red, swollen bronchial tubes in your lungs. This inflammation can damage your lungs. Treating this is key to managing asthma in the long run.",
       "Airway irritability: People with asthma have sensitive airways that tend to overreact and narrow when they come into contact with even slight triggers."
      ],
      ["Coughing: Coughing from asthma is usually worse early in the morning and at night. This can lead to problems sleeping.",
      "Tightness in the chest. You may feel breathless and like something is squeezing your chest.",
      "Wheezing. A hoarse, squeaky, musical, or whistling sound when you breathe.",
      "Coughing with mucus."],
      ["Beclomethasone (QVAR)",
      "Budesonide (Pulmicort)",
      "Montelukast (Singulair)",
      "Formoterol (Perforomist)",
      "Budesonide and formoterol (Symbicort)",
      "Fluticasone and vilanterol (Breo)",
      "Mometasone and formoterol (Dulera)",
      "Levalbuterol (Xopenex HFA)",
      "Ipratropium (Atrovent FHA)",
      "Tiotropium bromide (Spiriva)"
      ],

    ["Asthma","asthma attack","bronchial asthma","attack","bronchospasm","respiratory disease","respiratory disorder","respiratory illness","status asthmaticus","choking","exhausted"]

      );

    let newDisease9 = await dis.createDisease(
      "Gout",
      "Gout is a common and complex form of arthritis that can affect anyone. It's characterized by sudden, severe attacks of pain, swelling, redness and tenderness in one or more joints, most often in the big toe.An attack of gout can occur suddenly, often waking you up in the middle of the night with the sensation that your big toe is on fire. The affected joint is hot, swollen and so tender that even the weight of the bedsheet on it may seem intolerable.",
       ["Intense joint pain. Gout usually affects the big toe, but it can occur in any joint. Other commonly affected joints include the ankles, knees, elbows, wrists and fingers. The pain is likely to be most severe within the first four to 12 hours after it begins.",
       "Lingering discomfort. After the most severe pain subsides, some joint discomfort may last from a few days to a few weeks. Later attacks are likely to last longer and affect more joints.",
       "Inflammation and redness. The affected joint or joints become swollen, tender, warm and red.",
       "Limited range of motion. As gout progresses, you may not be able to move your joints normally.",
       "The symptoms of gout may be sudden and often start at night. The affected joint swells and becomes red, hot, and painful."
      ],
      
      ["Drink plenty of water to help your kidneys function better and avoid dehydration.",
        "Exercise regularly to stay at a healthy weight. Extra weight increases uric acid in your body and puts more stress on joints.",
       "Do your best to limit the purines in your body, since these chemicals can trigger uric acid buildup.",
       "Foods and drinks containing high purine levels include: Alcohol, Red meat and organ meats (liver, for example), Shellfish, Gravy, Drinks and foods high in fructose (fruit sugar), Protein from animal sources.",
       "All protein from animal flesh can potentially lead to elevated uric acid levels."
      ],
    ["NSAIDs",
      "Colchicine",
      "Corticosteroids",
      "Allopurinol",
    "Febuxostat",
    "Pegloticase",
    "Probenecid"
  ],
    ["gout","gouty arthritis","crystalline arthritis","urarthritis","arthritis","gustation"]

      );
 
    let newDisease10 = await dis.createDisease(
      "Hyperlipidemia",
      "Hyperlipidemia (high cholesterol) means your blood has too many lipids (fats) in it. These can add up and lead to blockages in your blood vessels. This is why high cholesterol can put you at risk for a stroke or heart attack. But you can make lifestyle changes like eating healthier and exercising to lower your cholesterol. Medicine can help, too.",
       ["Most people don’t have symptoms when their cholesterol is high",
       "People who have a genetic problem with cholesterol clearance that causes very high cholesterol levels may get xanthomas (waxy, fatty plaques on the skin) or corneal arcus (cholesterol rings around the iris of the eye). ",
        ],
      
      ["Exercising",
        "Quitting smoking.",
       "Sleeping at least seven hours each night.",
       "Keeping your stress level under control.",
       "Eating healthier foods.",
       "Limiting how much alcohol you drink.",
       "Losing a few pounds to reach a healthy weight."
      ],
    ["simvastatin",
      "lovastatin",
      "atorvastatin",
      "rosuvastatin",
    "evolocumab (repatha)"],
    ["hyperlipidemia","high cholesterol","hypercholesterolemia","lipemia","hyperlipaemia"]

      );
  
    let newDisease11 = await dis.createDisease(
      "Malaria",
      "Malaria is a disease caused by a parasite. The parasite is spread to humans through the bites of infected mosquitoes. People who have malaria usually feel very sick with a high fever and shaking chills. While the disease is uncommon in temperate climates, malaria is still common in tropical and subtropical countries. Each year nearly 290 million people are infected with malaria, and more than 400,000 people die of the disease. To reduce malaria infections, world health programs distribute preventive drugs and insecticide-treated bed nets to protect people from mosquito bites. The World Health Organization has recommended a malaria vaccine for use in children who live in countries with high numbers of malaria cases. Protective clothing, bed nets and insecticides can protect you while traveling. You also can take preventive medicine before, during and after a trip to a high-risk area. Many malaria parasites have developed resistance to common drugs used to treat the disease. Some people who have malaria experience cycles of malaria 'attacks.' An attack usually starts with shivering and chills, followed by a high fever, followed by sweating and a return to normal temperature. Malaria signs and symptoms typically begin within a few weeks after being bitten by an infected mosquito. However, some types of malaria parasites can lie dormant in your body for up to a year.",
       ["Fever",
       "Chills",
       "General feeling of discomfort",
       "Headache",
       "Nausea and vomiting",
       "Diarrhea",
       "Abdominal pain",
       "Muscle or joint pain",
       "Fatigue",
       "Rapid breathing",
       "Rapid heart rate",
       "Cough"],
      
      ["If you live in or are traveling to an area where malaria is common, take steps to avoid mosquito bites. Mosquitoes are most active between dusk and dawn",
      "Cover your skin. Wear pants and long-sleeved shirts. Tuck in your shirt, and tuck pant legs into socks.",
      "Apply insect repellent to skin. Use an insect repellent registered with the Environmental Protection Agency on any exposed skin. These include repellents that contain DEET, picaridin, IR3535, oil of lemon eucalyptus (OLE), para-menthane-3,8-diol (PMD) or 2-undecanone. Do not use a spray directly on your face. Do not use products with OLE or PMD on children under age 3.",
      "Apply repellent to clothing. Sprays containing permethrin are safe to apply to clothing.",
      "Sleep under a net. Bed nets, particularly those treated with insecticides, such as permethrin, help prevent mosquito bites while you are sleeping."
      ],
    ["Chloroquine phosphate.",
      "Artemisinin-based combination therapies (ACTs). ",
      "Atovaquone-proguanil (Malarone)",
      "Quinine sulfate (Qualaquin) with doxycycline (Oracea, Vibramycin, others)",
    "Primaquine phosphate"],
    ["Malaria","ague","jungle fever","marsh or swamp fever","paludism","Plasmodium falciparum","falciparum","Plasmodium malariae","Plasmodium"]

      );
 
    let newDisease12 = await dis.createDisease(
      "Chicken Pox",
      "Chickenpox is an infection caused by the varicella-zoster virus. It causes an itchy rash with small, fluid-filled blisters. Chickenpox is highly contagious to people who haven't had the disease or been vaccinated against it. Chickenpox infection is caused by the varicella-zoster virus. It can spread through direct contact with the rash. It can also spread when a person with the chickenpox coughs or sneezes and you inhale the air droplets. Chickenpox is normally a mild disease. But it can be serious and can lead to complications including: Bacterial infections of the skin, soft tissues, bones, joints or bloodstream (sepsis) Dehydration, Pneumonia, Inflammation of the brain (encephalitis), Toxic shock syndrome, Reye's syndrome in children and teenagers who take aspirin during chickenpox, Death. Today, a vaccine is available that protects children against chickenpox. Routine vaccination is recommended by the U.S. Centers for Disease Control and Prevention (CDC). The chickenpox vaccine is a safe, effective way to prevent chickenpox and its possible complications.",
       ["The itchy blister rash caused by chickenpox infection appears 10 to 21 days after exposure to the virus and usually lasts about five to 10 days",
       "Fever",
      "Loss of appetite",
      "Headache",
      "Tiredness and a general feeling of being unwell (malaise)",
      "Once the chickenpox rash appears, it goes through three phases:",
      "Raised pink or red bumps (papules), which break out over several days",
      "Small fluid-filled blisters (vesicles), which form in about one day and then break and leak",
      "Crusts and scabs, which cover the broken blisters and take several more days to heal"],
      
      ["The chickenpox (varicella) vaccine is the best way to prevent chickenpox. Experts from the CDC estimate that the vaccine provides complete protection from the virus for nearly 98% of people who receive both of the recommended doses. When the vaccine doesn't provide complete protection, it significantly lessens the severity of chickenpox.",
        "Young children: In the United States, children receive two doses of the varicella vaccine — the first between ages 12 and 15 months and the second between ages 4 and 6 years — as part of the routine childhood vaccination schedule. The vaccine can be combined with the measles, mumps and rubella vaccine, but for some children between the ages of 12 and 23 months, the combination may increase the risk of fever and seizure from the vaccine. Discuss the pros and cons of combining the vaccines with your child's doctor.",
       "Unvaccinated older children: Children ages 7 to 12 years who haven't been vaccinated should receive two catch-up doses of the varicella vaccine, given at least three months apart. Children age 13 or older who haven't been vaccinated should also receive two catch-up doses of the vaccine, given at least four weeks apart.",
       "Unvaccinated adults who've never had chickenpox and are at high risk of exposure. This includes health care workers, teachers, child care employees, international travellers, military personnel, adults who live with young children and all women of childbearing age. Adults who've never had chickenpox or been vaccinated usually receive two doses of the vaccine, four to eight weeks apart. If you don't remember whether you've had chickenpox or the vaccine, a blood test can determine your immunity.",
       "The chickenpox vaccine isn't approved for: Pregnant women, 	People who have weakened immune systems, such as those who are infected with HIV, or people who are taking immune-suppressing medications"
      ],
    ["acyclovir",
      "Sitavig",
      "Zovirax",
      "diphenhydramine"],
    ["Chicken","Chicken Pox","Pox","Skin","Dots","Varicella","Zoster","Shingles","Varicella-Zoster"]

      );
 
    let newDisease13 = await dis.createDisease(
      "COVID-19",
      "A new virus called severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) was identified as the cause of a disease outbreak that began in China in 2019. The disease is called coronavirus disease 2019 (COVID-19).In March 2020, the World Health Organization (WHO) declared COVID-19 a pandemic. Public health groups, including the U.S. Centers for Disease Control and Prevention (CDC) and WHO, are monitoring the pandemic and posting updates on their websites. These groups have also issued recommendations for preventing the spread of the virus that causes COVID-19.How does the coronavirus spread? Data has shown that the COVID-19 virus mainly spreads from person to person among those in close contact (within about 6 feet, or 2 meters). The virus spreads by respiratory droplets released when someone infected with the virus coughs, sneezes, breathes, sings or talks. These droplets can be inhaled or land in the mouth, nose or eyes of a person nearby. Sometimes the COVID-19 virus can spread when a person is exposed to small droplets or aerosols that stay in the air for several minutes or hours — called airborne transmission. The virus can also spread if you touch a surface with the virus on it and then touch your mouth, nose or eyes. But the risk is low. The COVID-19 virus can spread from someone who is infected but has no symptoms. This is called asymptomatic transmission. The COVID-19 virus can also spread from someone who is infected but hasn't developed symptoms yet. This is called presymptomatic transmission. It's possible to get COVID-19 twice or more, but this is uncommon.",
       ["Fever or chills",
       "Cough",
       "Shortness of breath or difficulty breathing",
       "Fatigue",
       "Muscle or body aches",
       "Headache",
       "New loss of taste or smell",
      "Sore throat",
    "Congestion or runny nose",
    "Diarrhea",
    "Nausea or vomiting"

  ],

      
      [
        "If you haven't gotten a COVID-19 vaccine, you can reduce your risk of infection from the COVID-19 virus and reduce the risk of spreading it to others. The CDC and WHO recommend following these precautions:",
"Keep at least 6 feet (2 meters) of distance between yourself and people outside your household.",
"Avoid crowds and indoor places that have poor airflow (ventilation).",
"Wash your hands often with soap and water for at least 20 seconds. If you’re not able to wash your hands, use an alcohol-based hand sanitizer that contains at least 60% alcohol.",
"Wear a mask in public places, especially when social distancing is difficult.",
"Cover your mouth and nose with your elbow or a tissue when you cough or sneeze. Throw away the used tissue. Wash your hands right away.",
"Avoid touching your eyes, nose and mouth.",
"Clean and disinfect often-touched surfaces daily.",
"If you have a chronic medical condition, you may have a higher risk of serious illness. Check with your health care provider about other ways to protect yourself.",
"If you develop symptoms or you've been exposed to the virus that causes COVID-19, contact your health care provider for medical advice. Your health care provider will likely recommend that you get tested for COVID-19. If you have emergency COVID-19 symptoms, such as trouble breathing, seek care immediately. If you need to go to a hospital, call ahead so that health care providers can take steps to ensure that others aren't exposed.",
"Take the following precautions to avoid spreading the virus that causes COVID-19:",
"Stay home from work, school and public areas and stay in isolation, except to get medical care.",
"Avoid public transportation, taxis and ride-hailing services.",
"Wear a cloth face mask around other people or pets.",
"Wash your hands frequently with soap and water for at least 20 seconds.",
"Isolate yourself as much as possible from other people or pets in your home.",
"Use a separate bedroom and bathroom if possible.",
"Avoid sharing dishes, glasses, bedding and other household items.",
"Clean and disinfect often-touched surfaces daily."
      ],
    ["Antiviral drugs. In addition to remdesivir, other antiviral drugs being tested include favipiravir and merimepodib. Studies have found that the combination of lopinavir and ritonavir isn't effective.",
    "Dexamethasone. The corticosteroid dexamethasone is one type of anti-inflammatory drug that researchers are studying to treat or prevent organ dysfunction and lung injury from inflammation. Studies have found that it reduces the risk for deaths by about 30% for people on ventilators and by about 20% for people who needed supplemental oxygen.",
    "The U.S. National Institutes of Health has recommended this drug for people hospitalized with COVID-19 who are on mechanical ventilators or need supplemental oxygen. Other corticosteroids, such as prednisone, methylprednisolone or hydrocortisone, may be used if dexamethasone isn't available. Dexamethasone and other corticosteroids may be harmful if given for less severe COVID-19 infection.",
    "In some cases, the drugs tocilizumab or baricitinib may be given with dexamethasone in hospitalized people who are on mechanical ventilation or need supplemental oxygen. Remdesivir may be given with dexamethasone in hospitalized people who need supplemental oxygen or who are on mechanical ventilation.",
    "Anti-inflammatory therapy. Researchers study many anti-inflammatory drugs to treat or prevent dysfunction of several organs and lung injury from infection-associated inflammation.",
    "Immune-based therapy. Researchers study the use of a type of immune-based therapy called convalescent plasma. The FDA has granted emergency use authorization for convalescent plasma therapy to treat COVID-19. Convalescent plasma is blood donated by people who've recovered from COVID-19. Convalescent plasma with high antibodies may be used to treat some hospitalized people ill with COVID-19 who are either early in their illness or who have weakened immune systems.",
    "Researchers also study other immune-based therapies, including mesenchymal stem cells and monoclonal antibodies. Monoclonal antibodies are proteins created in a lab that can help the immune system fight off viruses.",
    "Several monoclonal antibody medications are available. These include sotrovimab, a combination of bamlanivimab and etesevimab, and a combination of two antibodies called casirivimab and imdevimab. These drugs are used to treat mild to moderate COVID-19 in people who have a higher risk of developing serious illness due to COVID-19. Treatment consists of a single intravenous infusion given in an outpatient setting. To be most effective, these medications need to be given soon after COVID-19 symptoms start and prior to hospitalization.",
    "The FDA has also authorized the use of casirivimab and imdevimab as well as bamlanivimab and etesevimab as a treatment for people at higher risk of serious illness who have recently been exposed to the COVID-19 virus or who are at high risk of exposure. For example, people at high risk of exposure may include those living in nursing homes or prisons where others have recently been infected with the COVID-19 virus. This treatment is for people who aren't fully vaccinated, or who are fully vaccinated but have a weakened immune system.",
    "Drugs being studied that have uncertain effectiveness. Researchers study amlodipine and losartan. But it's not yet known how effective these drugs may be in treating or preventing COVID-19. Famotidine isn’t likely to be beneficial in treating COVID-19.",
    "Ivermectin. Ivermectin isn't a drug for treating viruses and the FDA hasn’t approved use of this drug to treat or prevent COVID-19. Taking large doses of this drug can cause serious harm. Don't use medications intended for animals on yourself.",
    "Hydroxychloroquine and chloroquine. These malaria drugs were authorized for emergency use by the FDA during the COVID-19 pandemic. However, the FDA withdrew that authorization when data analysis showed that the drugs are not effective for treating COVID-19. They can also cause serious heart problems.",
    "Drugs to prevent COVID-19. Researchers are studying drugs to prevent COVID-19 before and after exposure to the virus."],
    ["corona","covid","covid-19","coronavirus","virus","Sars","Sars-covid","omicron","disease","covid19"]

      );
 
    let newDisease14 = await dis.createDisease(
      "Small Pox",
      "Smallpox is a contagious, disfiguring and often deadly disease that has affected humans for thousands of years. Naturally occurring smallpox was wiped out worldwide by 1980 — the result of an unprecedented global immunization campaign. Samples of smallpox virus have been kept for research purposes. And advances in synthetic biology have made it possible to create smallpox from published amino acid sequences. This has led to concerns that smallpox could someday be used as a biological warfare agent. No cure or treatment for smallpox exists. A vaccine can prevent smallpox, but the risk of the vaccine's side effects is too high to justify routine vaccination for people at low risk of exposure to the smallpox virus. Smallpox is caused by infection with the variola virus. The virus can be transmitted:Directly from person to person. Indirectly from an infected person. 	Via contaminated items.",
       ["The first symptoms of smallpox usually appear 10 to 14 days after you're infected. During the incubation period of seven to 17 days, you look and feel healthy and can't infect others.Following the incubation period, a sudden onset of flu-like signs and symptoms occurs",
       "Fever",
       "Overall discomfort",
       "Headache",
       "Severe fatigue",
       "Severe back pain",
       "Vomiting"
          ],
      
      ["In the event of an outbreak, people who had smallpox would be kept in isolation in an effort to control the spread of the virus. Anyone who had contact with someone who developed an infection would need a smallpox vaccine, which can prevent or lessen the severity of the disease if given within four days of exposure to the smallpox virus.",
      "Two vaccines are available. One vaccine (ACAM2000) uses a live virus that's related to smallpox, and it can occasionally cause serious complications, such as infections affecting the heart or brain. That's why it's not recommended that everyone be vaccinated at this time. The potential risks of the vaccine outweigh the benefits, in the absence of an actual smallpox outbreak.",
      "A second vaccine, a modified vaccinia Ankara vaccine (Jynneos), has been found to be safe, and it can be used in people who aren't able to take ACAM2000, who have weakened immune systems or who have skin disorders.",
      "Immunity or partial immunity after a smallpox vaccine may last up to 10 years, and 20 years with revaccination. If an outbreak ever occurred, people who were vaccinated as children would still likely receive a new vaccination after direct exposure to someone with the virus."
      ],
    ["TPOXX",
      "TEMBEXA",
      "brincidofovir ",
      "Cidofovir"],
    ["small pox","small","pox","disease"]

      );

    let newDisease15 = await dis.createDisease(
      "Alzheimer's",
      "Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. Alzheimer's disease is the most common cause of dementia — a continuous decline in thinking, behavioural and social skills that affects a person's ability to function independently. Approximately 5.8 million people in the United States age 65 and older live with Alzheimer's disease. Of those, 80% are 75 years old and older. Out of the approximately 50 million people worldwide with dementia, between 60% and 70% are estimated to have Alzheimer's disease. The early signs of the disease include forgetting recent events or conversations. As the disease progresses, a person with Alzheimer's disease will develop severe memory impairment and lose the ability to carry out everyday tasks. Medications may temporarily improve or slow progression of symptoms. These treatments can sometimes help people with Alzheimer's disease maximize function and maintain independence for a time. Different programs and services can help support people with Alzheimer's disease and their caregivers. There is no treatment that cures Alzheimer's disease or alters the disease process in the brain. In advanced stages of the disease, complications from severe loss of brain function — such as dehydration, malnutrition or infection — result in death.",
       ["Memory loss that affects daily life",
       "Changes in the ability to follow a plan or solve a problem:",
       "Changes in the ability to complete familiar tasks",
       "Confusion about time or place",
       "Problems with vision or understanding visual information",
       "Problems with words",
       "Misplacing things",
      "Poor judgment",
    "Withdrawal from activities",
  "Changes in mood and personality",
  "Depression.",
  "Unreported pain, illness, or medicine side effects (due to the inability to communicate).",
  "Falls.",
  "Pneumonia or other infections.",
  "Malnutrition or dehydration.",],
      
      ["Avoid smoking.",
      "Control vascular risk factors, including high blood pressure, high cholesterol and diabetes.",
      "Eat a balanced diet — such as the Mediterranean diet — that's rich in vegetables, fruits and lean protein, particularly protein sources containing omega-3 fatty acids.",
      "Be physically and socially active, including engaging in aerobic exercise.",
      "Take care of your mental health.",
      "Use thinking (cognitive) skills, such as memory skills."
      ],
    ["Cholinesterase inhibitors",
      "Memantine",
      "MCI"],
    ["Alzheimer's","Alzheimer","presenile dementia","senile psychosis","psychosis","psych","mental","brain","disease"]

      );

    let newDisease16 = await dis.createDisease(
      "Lung Cancer",
      "Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale. People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.",
      ["A new cough that doesn't go away", 
      "Coughing up blood, even a small amount", 
      "Shortness of breath", 
      "Chest pain", 
      "Hoarseness", 
      "Losing weight without trying", 
      "Bone pain", 
      "Headache"
      ],
      ["Don't smoke. If you've never smoked, don't start. Talk to your children about not smoking so that they can understand how to avoid this major risk factor for lung cancer.", 
      "Avoid secondhand smoke. If you live or work with a smoker, urge him or her to quit.",
      "Test your home for radon. Have the radon levels in your home checked, especially if you live in an area where radon is known to be a problem.",
      "Avoid carcinogens at work. Take precautions to protect yourself from exposure to toxic chemicals at work. Follow your employer's precautions.",
      "Eat a diet full of fruits and vegetables. Choose a healthy diet with a variety of fruits and vegetables. Food sources of vitamins and nutrients are best. Avoid taking large doses of vitamins in pill form, as they may be harmful.",
      "Exercise most days of the week. If you don't exercise regularly, start out slowly. Try to exercise most days of the week."
      ],
      ["Methotrexate", "Docetaxel-Gemciabine regimen", "Bevacizumab", "Erlotinib", "Atezolizumab", "Nivolumab"],
      ["cancer", "lung cancer", "lung diseases", "carcinoid", "lung", "SCLC", "NSCLC", "carcinoma", "lymphoma", "malignancy", "melanoma","disease"]
    )

    let newDisease17 = await dis.createDisease(
      "Cirrhosis",
      "Cirrhosis is a late stage of scarring (fibrosis) of the liver caused by many forms of liver diseases and conditions, such as hepatitis and chronic alcoholism. Each time your liver is injured — whether by disease, excessive alcohol consumption or another cause — it tries to repair itself. In the process, scar tissue forms. As cirrhosis progresses, more and more scar tissue forms, making it difficult for the liver to function (decompensated cirrhosis). Advanced cirrhosis is life-threatening.The liver damage done by cirrhosis generally can't be undone. But if liver cirrhosis is diagnosed early and the cause is treated, further damage can be limited and, rarely, reversed.",
      ["Fatigue", 
      "Easily bleeding or bruising", 
      "Loss of appetite", 
      "Nausea", 
      "Swelling in your legs, feet or ankles (edema)", 
      "Weight loss", 
      "Itchy skin", 
      "Yellow discoloration in the skin and eyes (jaundice)", 
      "Fluid accumulation in your abdomen (ascites)", 
      "Spiderlike blood vessels on your skin", 
      "Redness in the palms of the hands", 
      "For women, absent or loss of periods not related to menopause", 
      "For men, loss of sex drive, breast enlargement (gynecomastia) or testicular atrophy", 
      "Confusion, drowsiness and slurred speech (hepatic encephalopathy)"
      ],
      ["Do not drink alcohol if you have cirrhosis. If you have liver disease, you should avoid alcohol.", 
      "Eat a healthy diet. Choose a plant-based diet that's full of fruits and vegetables. Select whole grains and lean sources of protein. Reduce the amount of fatty and fried foods you eat", 
      "Maintain a healthy weight. An excess amount of body fat can damage your liver. Talk to your doctor about a weight-loss plan if you are obese or overweight",
      "Reduce your risk of hepatitis. Sharing needles and having unprotected sex can increase your risk of hepatitis B and C. Ask your doctor about hepatitis vaccinations."],
      ["Diuretic: Bumetanide, Spironolactone", "Ammonia Reducer: Lactulose", "Betablocker: Nadolol and Propranolol", "Antiviral drug: Lamivudine"],
      ["cirrhosis", "liver disease", "fibrosis", "hepatitis", "fatty liver disease", "liver failure", "liver problems","disease"]
    ) 

    let newDisease18 = await dis.createDisease(
      "Polio",
      "Polio is a contagious viral illness that in its most severe form causes nerve injury leading to paralysis, difficulty breathing and sometimes death. In the U.S., the last case of naturally occurring polio was in 1979. Today, despite a worldwide effort to wipe out polio, poliovirus continues to affect children and adults in parts of Asia and Africa. The Centers for Disease Control and Prevention (CDC) advises taking precautions to protect yourself from polio if you're traveling anywhere there's a risk of polio. Adults who have been vaccinated who plan to travel to an area where polio is occurring should receive a booster dose of inactivated poliovirus vaccine (IPV). Immunity after a booster lasts a lifetime.",
      ["Fever", 
      "Sore throat", 
      "Headache", 
      "Vomiting", 
      "Fatigue", 
      "Back pain or stiffness", 
      "Neck pain or stiffness", 
      "Pain or stiffness in the arms or legs", 
      "Muscle weakness or tenderness", 
      "Loss of reflexes", 
      "Severe muscle aches or weakness", 
      "Loose and floppy limbs (flaccid paralysis)", 
      "Sleep-related breathing disorders, such as sleep apnea", 
      "Decreased tolerance of cold temperatures"
      ],
      ["The most effective way to prevent polio is vaccination.",
      "IPV is safe for people with weakened immune systems, although it's not certain just how protective the vaccine is in cases of severe immune deficiency. Common side effects are pain and redness at the injection site."
      ],
      ["Nonsteroidal anti-inflammatory drug: Ibuprofen, Aspirin", "Analgesic: Acetaminophen"],
      ["polio", "Poliomyelitis", "WPV", "viral disease", "contagious disease", "poliovirus", "infantile paralysis", "Heine-Medin disease"]
    )

    let newDisease19 = await dis.createDisease(
      "Chronic Kidney Disease ",
      "Chronic kidney disease, also called chronic kidney failure, involves a gradual loss of kidney function. Your kidneys filter wastes and excess fluids from your blood, which are then removed in your urine. Advanced chronic kidney disease can cause dangerous levels of fluid, electrolytes and wastes to build up in your body. In the early stages of chronic kidney disease, you might have few signs or symptoms. You might not realize that you have kidney disease until the condition is advanced. Treatment for chronic kidney disease focuses on slowing the progression of kidney damage, usually by controlling the cause. But, even controlling the cause might not keep kidney damage from progressing. Chronic kidney disease can progress to end-stage kidney failure, which is fatal without artificial filtering (dialysis) or a kidney transplant.",
      ["Nausea", 
      "Vomiting", 
      "Loss of appetite", 
      "Fatigue and weakness", 
      "Sleep problems", 
      "Urinating more or less", 
      "Decreased mental sharpness", 
      "Muscle cramps", 
      "Swelling of feet and ankles", 
      "Dry, itchy skin", 
      "High blood pressure (hypertension) that's difficult to control", 
      "Shortness of breath, if fluid builds up in the lungs", 
      "Chest pain, if fluid builds up around the lining of the heart"
      ],
      ["Follow instructions on over-the-counter medications. When using nonprescription pain relievers, such as aspirin, ibuprofen (Advil, Motrin IB, others) and acetaminophen (Tylenol, others), follow the instructions on the package. Taking too many pain relievers for a long time could lead to kidney damage.",
      "Maintain a healthy weight. If you're at a healthy weight, maintain it by being physically active most days of the week. If you need to lose weight, talk with your doctor about strategies for healthy weight loss",
      "Don't smoke. Cigarette smoking can damage your kidneys and make existing kidney damage worse. If you're a smoker, talk to your doctor about strategies for quitting. Support groups, counseling and medications can all help you to stop.",
      "Manage your medical conditions with your doctor's help. If you have diseases or conditions that increase your risk of kidney disease, work with your doctor to control them. Ask your doctor about tests to look for signs of kidney damage."
      ],
      ["Vitamin: Calcitriol, Paricalcitol, Ergocalciferol", "Calcium Reducer: Cinacalcet", "Bone Marrow stimulant: Erythropoietin treatment, Darbepoetin alfa", "Diuretic: Bumetanide, Furosemide", "Dietary Supplements"],
      ["CKD", "chronic kidney disease", "Chronic kidney failure", "Lupus nephritis", "Polycystic kidney disease", "kidney disease", "kidney failure", "kidney", "kidney infections"]
    )

    let newDisease20 = await dis.createDisease(
      "Cystic Fibrosis",
      "Cystic fibrosis (CF) is an inherited disorder that causes severe damage to the lungs, digestive system and other organs in the body. Cystic fibrosis affects the cells that produce mucus, sweat and digestive juices. These secreted fluids are normally thin and slippery. But in people with CF, a defective gene causes the secretions to become sticky and thick. Instead of acting as lubricants, the secretions plug up tubes, ducts and passageways, especially in the lungs and pancreas. Although cystic fibrosis is progressive and requires daily care, people with CF are usually able to attend school and work. They often have a better quality of life than people with CF had in previous decades. Improvements in screening and treatments mean that people with CF now may live into their mid- to late 30s or 40s, and some are living into their 50s.",
      ["Respiratory signs and symptoms", 
      "A persistent cough that produces thick mucus (sputum)", 
      "Wheezing", 
      "Exercise intolerance", 
      "Repeated lung infections", 
      "Inflamed nasal passages or a stuffy nose", 
      "Recurrent sinusitis", 
      "Digestive signs and symptoms", 
      "Foul-smelling, greasy stools", 
      "Poor weight gain and growth", 
      "Intestinal blockage, particularly in newborns (meconium ileus)", 
      "Chronic or severe constipation, which may include frequent straining while trying to pass stool, eventually causing part of the rectum to protrude outside the anus (rectal prolapse)"
      ],
      ["If you or your partner has close relatives with cystic fibrosis, you both may choose to have genetic testing before having children. The test, which is performed in a lab on a sample of blood, can help determine your risk of having a child with CF.",
      "If you're already pregnant and the genetic test shows that your baby may be at risk of cystic fibrosis, your doctor can conduct additional tests on your developing child.",
      "Genetic testing isn't for everyone. Before you decide to be tested, you should talk to a genetic counselor about the psychological impact the test results might carry.",
      ],
      ["Dietary Supplement: Medium-chain triglyceride", "Antibiotics: Tobramycin, Azithromycin, Meropenem", "Penicillin: Piperacillin / Tazobactam", "Cough Medicine: Dornase alfa, Acetylcysteine"],
      ["cystic fibrosis", "CF", "fibrosis", "Cystic fibrosis of pancreas", "Fibrocystic disease of pancreas", "Mucoviscidosis", "disease of pancreas", "mucoviscidosis of the pancreas", "pancreas fibrocystic disease"]
    )
  
    let user1 = await user.createUser("user01.jpeg-1639017120258", "Tia", "Patel", "user01", "tpatel@gmail.com", "helloo12", "736-787-8373", "India", "Hello I am Tia Patel", "Female", "Doctor", "2021-11-27")

    let user2 = await user.createUser("user02.jpeg-1639017199758", "Krina", "Shah", "user02", "kshah@gmail.com", "true1234", "126-547-8373", "Zimbabwe", "Hello I am Krina. I am from Zimbabwe", "Female", "Patient", "2021-04-27")

    let user3 = await user.createUser("RossGeller.jpeg-1639017318602", "Ross", "Geller", "user03", "rg123@gmail.com", "friends1234", "336-237-4673", "United States", "Hello I am Ross. I am from US", "Male", "Patient", "2021-12-04")
 
    let user4 = await user.createUser("monica.jpeg-1639017441746", "Moneka", "Bing", "user04", "moneka03@gmail.com", "friends09", "543-217-4863", "China", "Hello I am Moneka. I am from China", "Female", "Doctor", "1971-04-09")

    let user5 = await user.createUser("Lee-Min-ho.jpeg-1639017543030", "Lee", "Min Ho", "user05", "dhfjf@gmail.com", "flowers74", "436-256-4653", "South Korea", "Hello I am Lee. I am from SK", "Male", "Patient", "2021-12-03")

    let user6 = await user.createUser("user06.jpeg-1639017613794", "Terry", "Smith", "user06", "terry8989@yahoo.com", "terryuser06", "4785468989", "South Africa", "Hello I am Terry. I like to skate. I want to go on a trip", "Male", "Doctor", "1990-03-11")

    let user7 = await user.createUser("user07.jpeg-1639017688867", "Lyle", "Autin", "user07", "lyle09@rocket.co", "lyleuser@07", "(551)-789-5678", "Belgium", "Hello I am Lyle. I work at a construction company.", "Other", "Patient", "1986-11-27")

    let user8 = await user.createUser("user08.jpeg-1639017757304", "Laura", "Langstass", "user08", "langstass67@mail.com", "laurauser@87", "(656)-989-2318", "Iceland", "Hello I am Laura. I like to workout and remain healthy. I am very health consious", "Female", "Patient", "1989-12-12")

    let user9 = await user.createUser("JohnWick.png-1639017869801", "John", "Wick", "user09", "wick8989@mail.com", "wickuser@09", "7679090454", "Brazil", "Hello I am John. I am an actor. I like dogs", "Male", "Doctor", "1980-11-23")
 
    let user10 = await user.createUser("user10.jpeg-1639017948313", "Kate", "Williams", "user10", "katew43@mail.com", "kateuser@10", "3468768989", "Kenya", "Hello I am Kate. I like travelling", "Female", "Patient", "1991-08-12")

    let user11 = await user.createUser("user11.jpeg-1639018018451", "Maria", "Hernandez", "user11", "mher9090@hotspot.edu", "heruser@11", "323-987-5678", "Japan", "Hello I am Maria. I like to socialize", "Female", "Patient", "1991-09-15")

    let user12 = await user.createUser("user12.jpeg-1639018099237", "Allie", "Parker", "user12", "alliep12@bits.edu", "alluser@12", "(898)-763-9092", "Argentina", "Hello I am Allie. I like to play volleyball. Also, I want to explore the world as much as I can", "Female", "Doctor", "1986-06-19")

    let user13 = await user.createUser("user13.jpeg-1639018187974", "Shang", "Lee", "user13", "leeshang12@shanghaiu.edu", "shanguser@13", "8978908333", "China", "Hello I am Shang. I want to explore the world as much as I can. I like to read books", "Female", "Patient", "1975-04-12")

    let user14 = await user.createUser("user14.jpeg-1639018255955", "Maya", "Moore", "user14", "mmoore43@gmail.com", "muser@14", "989-767-3456", "Jamaica", "Hello I am Maya. I love adventurous sports. I like to read books too", "Female", "Patient", "1972-02-11")
  
    let user15 = await user.createUser("user15.jpeg-1639018337826", "Sarah", "Kyler", "user15", "sarahk@yahoo.com", "sarahuser@15", "5467894343", "Spain", "Hello I am Sarah. I am a college student. I like computers", "Female", "Patient", "1997-07-17")

    let user16 = await user.createUser("user16.jpeg-1639018451856", "Eseed", "Badan", "user16", "Ebada96@pocket.in", "badanuser@16", "9085673343", "Turkey", "Hello I am Eseed Badan. I am a Software Developer at Microgadgets", "Male", "Patient", "1985-04-21")

    let user17 = await user.createUser("ben.jpeg-1639018539470", "Ben", "Aflick", "user17", "benaf12@flock.com", "batmenuser@17", "6785673456", "Guatemala", "Hello I am Ben Aflick. I am the new Batmen", "Male", "Doctor", "1980-06-16")

    let user18 = await user.createUser("user18.png-1639018644018", "Ken", "Goodson", "user18", "keng09@rocketmail.co.in", "gooduser@18", "9876789089", "Indonesia", "Hello I am Ken Goodson. I am a cardiologist", "Male", "Doctor", "1971-09-11")

    let user19 = await user.createUser("user19.jpeg-1639018723574", "Charles", "Barkley", "user19", "charlesB90@yahoo.com", "charlesuser@19", "2346578776", "Australia", "Hello I am Charles. I like traveling. I aspire to be a doctor. I want to cure people from diseases", "Other", "Patient", "1995-05-29")

    let user20 = await user.createUser("user20.jpeg-1639018797247", "Shawn", "Rodgers", "user20", "rodgers879@gmail.com", "rodgersuser@20", "8379086789", "Canada", "Hello I am Shawn. I like music. Music heals people", "Male", "Doctor", "1989-03-21")


    let post1_1 = await post.createPost(newDisease1._id.toString(), user1._id, user1.username, "Cover your mouth and nose", "Cover your mouth and nose with a tissue any time you cough, sneeze, or laugh.")
    let post1_2 = await post.createPost(newDisease1._id.toString(), user2._id, user2.username, "Medicines names", "Can someone provide some available medicines names?")
    let post1_3 = await post.createPost(newDisease1._id.toString(), user3._id, user4.username, "This is important", "Stay home from work or school until your doctor says it’s okay to return.")
    let post1_4 = await post.createPost(newDisease1._id.toString(), user4._id, user4.username, "Keep distance", "Avoid close contact with people who has active TB disease.")
    let post1_5 = await post.createPost(newDisease1._id.toString(), user5._id, user5.username, "How long will the symptoms last?", "I got tuberculosisnot long ago. How long will the symptoms last?")
  
    let comment1_1 = await comment.createComment(post1_1._id, user2._id, user2.username, "Yes, we need to pay attention.")
    let comment1_2 = await comment.createComment(post1_1._id, user3._id, user3.username, "I agree with you.")
    let comment1_3 = await comment.createComment(post1_1._id, user4._id, user4.username, "We also need to avoid close contact with other people.")
    let comment1_4 = await comment.createComment(post1_2._id, user5._id, user5.username, "Isoniazid can help.")
    let comment1_5 = await comment.createComment(post1_2._id, user6._id, user6.username, "Recommend rifampin.")
    let comment1_6 = await comment.createComment(post1_3._id, user7._id, user7.username, "Yes, we can't infect others.")
    let comment1_7 = await comment.createComment(post1_3._id, user8._id, user8.username, "Thank you for your advice.")
    let comment1_8 = await comment.createComment(post1_4._id, user9._id, user9.username, "We must take care to protect ourselves from infection.")
    let comment1_9 = await comment.createComment(post1_4._id, user10._id, user10.username, "Distance is important.")
    let comment1_10 = await comment.createComment(post1_5._id, user11._id, user11.username, "Bad cough may last 3 weeks or longer.")
    let comment1_11 = await comment.createComment(post1_5._id, user12._id, user12.username, "Maybe more than a month.")

    await post.updateIsLike(post1_1._id, user1._id, 1)
    await post.updateIsLike(post1_1._id, user2._id, 1)
    await post.updateIsLike(post1_1._id, user3._id, 1)
    await post.updateIsLike(post1_1._id, user4._id, 1)
    await post.updateIsLike(post1_2._id, user13._id, 1)
    await post.updateIsLike(post1_2._id, user14._id, 1)
    await post.updateIsLike(post1_3._id, user15._id, 1)
    await post.updateIsLike(post1_4._id, user16._id, 1)
    await post.updateIsLike(post1_5._id, user17._id, 1)

    await post.updateIsLike(post1_1._id, user5._id, 0)
    await post.updateIsLike(post1_1._id, user6._id, 0)
    await post.updateIsLike(post1_1._id, user7._id, 0)

    await comment.updateIsLike(comment1_1._id, user1._id, 1)
    await comment.updateIsLike(comment1_1._id, user2._id, 1)
    await comment.updateIsLike(comment1_1._id, user3._id, 1)
    await comment.updateIsLike(comment1_4._id, user11._id, 1)
    
    await comment.updateIsLike(comment1_1._id, user4._id, 0)
    await comment.updateIsLike(comment1_1._id, user5._id, 0)
    await comment.updateIsLike(comment1_1._id, user6._id, 0)
    await comment.updateIsLike(comment1_1._id, user7._id, 0)
    await comment.updateIsLike(comment1_5._id, user12._id, 0)


    let post2_1 = await post.createPost(newDisease2._id.toString(), user6._id, user6.username, "Diabetes Symptom", "Can someone talk about the symptoms of diabetes?")
    let post2_2 = await post.createPost(newDisease2._id.toString(), user7._id, user7.username, "Please provide some suggestions", "How can I reduce the risk of diabetes?")
    let post2_3 = await post.createPost(newDisease2._id.toString(), user8._id, user8.username, "Any Medicine can help?", "Please recommend some medicine for me.")
    let post2_4 = await post.createPost(newDisease2._id.toString(), user9._id, user9.username, "Will I get diabetes?", "I like sweets very much.")
    let post2_5 = await post.createPost(newDisease2._id.toString(), user10._id, user10.username, "I feel bad.", "My friend has diabetes, and he is very sorry now.")
    
  
    let comment2_1 = await comment.createComment(post2_1._id, user7._id, user7.username, "You may feel extremely hungry and thirsty.")
    let comment2_2 = await comment.createComment(post2_1._id, user8._id, user8.username, "You may lose weight for no reason.")
    let comment2_3 = await comment.createComment(post2_2._id, user9._id, user9.username, "Exercising and maintaining a healthy weight can reduce your risk of diabetes.")
    let comment2_4 = await comment.createComment(post2_2._id, user10._id, user10.username, "Your diet should include lots of complex carbohydrates (such as whole grains), fruits, and vegetables.")
    let comment2_5 = await comment.createComment(post2_2._id, user11._id, user11.username, "Exercising helps your body use insulin and lower your blood sugar level.")
    let comment2_6 = await comment.createComment(post2_3._id, user12._id, user12.username, "NovoLog, FlexPen, Fiasp")
    let comment2_7 = await comment.createComment(post2_3._id, user13._id, user13.username, "Humulin N, Novolin N")
    let comment2_8 = await comment.createComment(post2_4._id, user14._id, user14.username, "You should pay attention to your diet.")
    let comment2_9 = await comment.createComment(post2_4._id, user15._id, user15.username, "Pay attention to more exercise at ordinary times.")
    let comment2_10 = await comment.createComment(post2_5._id, user16._id, user16.username, "I hope you try to comfort him.")
    let comment2_11 = await comment.createComment(post2_5._id, user17._id, user17.username, "I feel sorry for your friend.")

    await post.updateIsLike(post2_1._id, user1._id, 1)
    await post.updateIsLike(post2_1._id, user2._id, 1)
    await post.updateIsLike(post2_1._id, user3._id, 1)
    await post.updateIsLike(post2_1._id, user4._id, 1)
    await post.updateIsLike(post2_2._id, user15._id, 1)
    await post.updateIsLike(post2_2._id, user16._id, 1)

    await post.updateIsLike(post2_1._id, user5._id, 0)
    await post.updateIsLike(post2_1._id, user6._id, 0)
    await post.updateIsLike(post2_1._id, user7._id, 0)

    await comment.updateIsLike(comment2_1._id, user1._id, 1)
    await comment.updateIsLike(comment2_1._id, user2._id, 1)
    await comment.updateIsLike(comment2_1._id, user3._id, 1)
    await comment.updateIsLike(comment2_4._id, user11._id, 1)
    
    await comment.updateIsLike(comment2_1._id, user4._id, 0)
    await comment.updateIsLike(comment2_1._id, user5._id, 0)
    await comment.updateIsLike(comment2_1._id, user6._id, 0)
    await comment.updateIsLike(comment2_1._id, user7._id, 0)
    await comment.updateIsLike(comment2_5._id, user12._id, 0)


    let post3_1 = await post.createPost(newDisease3._id.toString(), user6._id, user6.username, "Some recommended drugs","Oxymazetol, Oxymazetola, Frisium, hope these can help.")
    let post3_2 = await post.createPost(newDisease3._id.toString(), user7._id, user7.username, "Stay calm","When you find someone getting a epilepsy, don’t move the person to another place.")
    let post3_3 = await post.createPost(newDisease3._id.toString(), user8._id, user8.username, "Plsease remember.","Most seizures aren’t life-threatening. You don’t need to call a doctor or an ambulance unless the person isn’t known to have epilepsy or unless the seizure lasts longer than 5 minutes.")
    let post3_4 = await post.createPost(newDisease3._id.toString(), user9._id, user9.username, "I am finding some information","Can someone introduce me to epilepsy?")
    let post3_5 = await post.createPost(newDisease3._id.toString(), user10._id, user10.username,"Symptoms of epilepsy","Can someone tell me about the symptoms of epilepsy?")
    
  
    let comment3_1 = await comment.createComment(post3_1._id, user7._id, user7.username,"Thank you for sharing.")
    let comment3_2 = await comment.createComment(post3_1._id, user8._id, user8.username, "Thank you, helps a lot.")
    let comment3_3 = await comment.createComment(post3_2._id, user9._id, user9.username, "I agree with you.")
    let comment3_4 = await comment.createComment(post3_2._id, user10._id, user10.username, "Yes, we must be careful to treat them.")
    let comment3_5 = await comment.createComment(post3_3._id, user11._id, user11.username, "Yes, we don't have to be too alarmed.")
    let comment3_6 = await comment.createComment(post3_3._id, user12._id, user12.username, "A good advice.")
    let comment3_7 = await comment.createComment(post3_4._id, user13._id, user13.username, "Epilepsy is a disorder of the brain.")
    let comment3_8 = await comment.createComment(post3_4._id, user14._id, user14.username, "People who have epilepsy have electrical activity in the brain that is not normal, causing seizures. There are different types of seizures. In some cases, a seizure may cause jerking, uncontrolled movements, and loss of consciousness. In other cases, seizures cause only a period of confusion, a staring spell, or muscle spasms. Epilepsy is also called a “seizure disorder.” Epilepsy is not a mental illness, and it is not a sign of low intelligence. It is also not contagious. Seizures do not normally cause brain damage. Between seizures, a person with epilepsy is no different from anyone else.")
    let comment3_9 = await comment.createComment(post3_5._id, user15._id, user15.username, "Unusual Anxiety")
    let comment3_10 = await comment.createComment(post3_5._id, user16._id, user16.username,"Absence (or petit mal) seizures")

    await post.updateIsLike(post3_1._id, user1._id, 1)
    await post.updateIsLike(post3_1._id, user2._id, 1)
    await post.updateIsLike(post3_1._id, user3._id, 1)
    await post.updateIsLike(post3_1._id, user4._id, 1)
    await post.updateIsLike(post3_2._id, user5._id, 1)
    await post.updateIsLike(post3_2._id, user6._id, 1)
    await post.updateIsLike(post3_3._id, user7._id, 1)
    await post.updateIsLike(post3_4._id, user8._id, 1)
    await post.updateIsLike(post3_5._id, user9._id, 1)

    await post.updateIsLike(post3_1._id, user10._id, 0)
    await post.updateIsLike(post3_2._id, user11._id, 0)
    await post.updateIsLike(post3_3._id, user12._id, 0)
    await post.updateIsLike(post3_4._id, user13._id, 0)
    await post.updateIsLike(post3_5._id, user14._id, 0)

    await comment.updateIsLike(comment3_1._id, user1._id, 1)
    await comment.updateIsLike(comment3_1._id, user2._id, 1)
    await comment.updateIsLike(comment3_1._id, user3._id, 1)
    await comment.updateIsLike(comment3_2._id, user4._id, 1)
    await comment.updateIsLike(comment3_2._id, user5._id, 1)
    await comment.updateIsLike(comment3_2._id, user6._id, 1)
    await comment.updateIsLike(comment3_3._id, user7._id, 1)
    await comment.updateIsLike(comment3_4._id, user8._id, 1)
    await comment.updateIsLike(comment3_5._id, user9._id, 1)

    await comment.updateIsLike(comment3_1._id, user10._id, 0)
    await comment.updateIsLike(comment3_2._id, user11._id, 0)
    await comment.updateIsLike(comment3_3._id, user12._id, 0)
    await comment.updateIsLike(comment3_4._id, user13._id, 0)
    await comment.updateIsLike(comment3_5._id, user14._id, 0)

    let post4_1 = await post.createPost(newDisease4._id.toString(), user6._id, user6.username, "Need somebody help","How to avoid getting skin cancer?")
    let post4_2 = await post.createPost(newDisease4._id.toString(), user7._id, user7.username, "Some treatments","Please introduce me to some treatments.")
    let post4_3 = await post.createPost(newDisease4._id.toString(), user8._id, user8.username, "Please tell me.","Want to know about the symptoms of Skin Cancer.")
    let post4_4 = await post.createPost(newDisease4._id.toString(), user9._id, user9.username, "I need help.","What can I do if I get skin cancer?")
    let post4_5 = await post.createPost(newDisease4._id.toString(), user10._id, user10.username, "I am searching for it.","Please tell me some information about skin cancer.")
    
  
    let comment4_1 = await comment.createComment(post4_1._id, user7._id, user7.username, "Avoid the sun.")
    let comment4_2 = await comment.createComment(post4_1._id, user8._id, user8.username, "Wear a wide-brimmed hat, protective clothing, and sunglasses.")
    let comment4_3 = await comment.createComment(post4_2._id, user9._id, user9.username, "Biological therapy, Targeted therapy")
    let comment4_4 = await comment.createComment(post4_2._id, user10._id, user10.username, "Radiation and Chemotherapy")
    let comment4_5 = await comment.createComment(post4_3._id, user11._id, user11.username, "A mole that itches or bleeds.")
    let comment4_6 = await comment.createComment(post4_3._id, user12._id, user12.username, "A scaly or crusted growth on the skin.")
    let comment4_7 = await comment.createComment(post4_4._id, user13._id, user13.username, "Continue checking your skin. Call your doctor if you see changes.")
    let comment4_8 = await comment.createComment(post4_4._id, user14._id, user14.username, "Eat a healthy diet, get plenty of sleep, and try to keep your energy up by staying active.")
    let comment4_9 = await comment.createComment(post4_5._id, user15._id, user15.username, "Skin cancer is the most common form of cancer in the United States. ")
    let comment4_10 = await comment.createComment(post4_5._id, user16._id, user16.username, "Almost all skin cancers are the result of too much exposure to ultraviolet light. This is found in sunlight, tanning booths, and sunlamps. Skin cancer is usually one of the most curable types of cancer. Basal cell carcinoma and squamous cell carcinoma are two of the most common forms of skin cancer. They are very curable. These cancers occur in the basal and squamous cell layers at the top of the skin. They are almost always slow-growing. If found early, they are easy to treat and do not spread.Melanoma is a less common but aggressive form of skin cancer. It occurs in skin cells that make a skin color pigment called melanin. If it is not found early, it will likely spread to other tissues. It can spread through the whole body and may cause death. Only 2% of skin cancer cases are melanoma. But it causes the most deaths from skin cancer.")

    await post.updateIsLike(post4_1._id, user1._id, 1)
    await post.updateIsLike(post4_1._id, user2._id, 1)
    await post.updateIsLike(post4_1._id, user3._id, 1)
    await post.updateIsLike(post4_1._id, user4._id, 1)
    await post.updateIsLike(post4_2._id, user5._id, 1)
    await post.updateIsLike(post4_2._id, user6._id, 1)
    await post.updateIsLike(post4_3._id, user7._id, 1)
    await post.updateIsLike(post4_4._id, user8._id, 1)
    await post.updateIsLike(post4_5._id, user9._id, 1)

    await post.updateIsLike(post4_1._id, user10._id, 0)
    await post.updateIsLike(post4_2._id, user11._id, 0)
    await post.updateIsLike(post4_3._id, user12._id, 0)
    await post.updateIsLike(post4_4._id, user13._id, 0)
    await post.updateIsLike(post4_5._id, user14._id, 0)

    await comment.updateIsLike(comment4_1._id, user1._id, 1)
    await comment.updateIsLike(comment4_1._id, user2._id, 1)
    await comment.updateIsLike(comment4_1._id, user3._id, 1)
    await comment.updateIsLike(comment4_2._id, user4._id, 1)
    await comment.updateIsLike(comment4_2._id, user5._id, 1)
    await comment.updateIsLike(comment4_2._id, user6._id, 1)
    await comment.updateIsLike(comment4_3._id, user7._id, 1)
    await comment.updateIsLike(comment4_4._id, user8._id, 1)
    await comment.updateIsLike(comment4_5._id, user9._id, 1)

    await comment.updateIsLike(comment4_1._id, user10._id, 0)
    await comment.updateIsLike(comment4_2._id, user11._id, 0)
    await comment.updateIsLike(comment4_3._id, user12._id, 0)
    await comment.updateIsLike(comment4_4._id, user13._id, 0)
    await comment.updateIsLike(comment4_5._id, user14._id, 0)
} catch(e){
    console.log(e);
}

  console.log("Done seeding the Database")

  await dis.searchDisease("cancer");
  await dbConnection.closeConnection();
}

main();