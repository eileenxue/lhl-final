module.exports = (db) => {

  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users`
    };

    return db
      .query(`SELECT * FROM users`)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };



  const getUserById = (id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (first_name, last_name, email, password, is_proctor) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password,is_proctor) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [first_name, last_name, email, password, is_proctor],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // ***********************************************
  // addAppointment, // did not add yet 
  // editAppointment,// did not add yet 
  // deleteAppointment,// did not add yet 

  // ******************************************

  const getStudentTodayTest = (id) => {
    const query = {
      text: `
      select appointments.start_date, appointments.test_id

      from appointments 
      where appointments.start_date = current_date and user_id = $1; 
      `,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getStudentPastTest = (id) => {
    const query = {
      text: `
      select appointments.start_date, appointments.test_id

      from appointments 
      where appointments.start_date < current_date and user_id = $1; 
      `,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getStudentFutureTest = (id) => {
    const query = {
      text: `
      select appointments.start_date, appointments.test_id

      from appointments 
      where appointments.start_date > current_date and user_id = $1; 
      `,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProctorTodayTest = (id) => {
    // today appointments except herself
    const query = {
      text: `
      select appointments.start_date, appointments.test_id

      from appointments 
      where appointments.start_date = current_date and user_id != $1; 
      `,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserById,
    addUser,
    // addAppointment, // did not add yet 
    // editAppointment,// did not add yet 
    // deleteAppointment,// did not add yet 
    getStudentTodayTest,
    getStudentPastTest,
    getStudentFutureTest,
    getProctorTodayTest,
  };
};
