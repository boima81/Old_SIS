module.exports = {
  friendlyName: "Data seeder",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    var admin = await Admin.find();
    if (admin.length == 0) {
      await Admin.create({
        firstName: "Super",
        lastName: "Admin",
        email: "admin@admin.com",
        password:
          "$2a$10$4Nc8PvwLgiJWcE4mcibv9uIpdlz7yYbu2wkpQXkdyhFbjzlwZOYBS",
      });
    }
    var SQL = `
            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 1','Cybersecurity Analyst 1 Description' , 6, 12, 1, true);
             
             
            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 2','Cybersecurity Analyst 2 Description' , 6, 12, 1, true);

            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 3','Cybersecurity Analyst 3 Description' , 6, 12, 1, true);

            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 4','Cybersecurity Analyst 4 Description' , 6, 12, 1, true);

            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 5','Cybersecurity Analyst 5 Description' , 6, 12, 1, true);

            INSERT INTO course(
            name, description, course_credit, per_credit_price, created_by, active)
            VALUES ('Cybersecurity Analyst 6','Cybersecurity Analyst 6 Description' , 6, 12, 1, true);


            INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 1', 'Semester 1 Description', true, 1);

  INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 2', 'Semester 2 Description', true, 1);

  INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 3', 'Semester 3 Description', true, 1);

  INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 4', 'Semester 4 Description', true, 1);

  INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 5', 'Semester 5 Description', true, 1);
  
  INSERT INTO semester(
	name, description, active, created_by)
	VALUES ('Semester 6', 'Semester 6 Description', true, 1);
             
  INSERT INTO semester_course(
	semester_id, course_id)
	VALUES (6, 2);

  INSERT INTO semester_course(
	semester_id, course_id)
	VALUES (3, 3);

  INSERT INTO semester_course(
	semester_id, course_id)
	VALUES (3, 2);
    
  
  INSERT INTO semester_course(
	semester_id, course_id)
	VALUES (4, 3);

    INSERT INTO semester_course(
	semester_id, course_id)
	VALUES (2, 2);


  INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 1', 'BE1 Course ', true, 1, 6);

  INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 2', 'BE2 Course ', true, 1, 4);


  INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 3', 'BE3 Course ', true, 1, 4);


  INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 4', 'BE4 Course ', true, 1, 5);
  

  INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 5', 'BE5 Course ', true, 1, 6);

    INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 6', 'BE6 Course ', true, 1, 1);


    INSERT INTO program(
name, description, active, created_by, semester_id)
	VALUES ('BE Computer 7', 'BE7 Course ', true, 1, 2);
  
  `;

    await sails.getDatastore().sendNativeQuery(SQL, []);

    exits.success();
  },
};
