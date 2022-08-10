const { students } = require("../config");
const db=require("../config")
const Students=db.students 
function validateName(name)
{
    var nameRegex = /^[a-zA-Z\-]+$/;
    var validfirstStudentname  =name.match(nameRegex);
    if(validfirstStudentname  == null){
        console.log("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
        return false;
}
else
{
    console.log("Your first name is  valid");

    return true;
}
}
function validateInscription(inscription)
{
    const insc = parseInt(inscription);
    if(1<insc<100)
    {
    console.log("correcte");
    return true;
    }
    else {
    console.log("incorrecte");
    return false;
    }
}
function validatemail(email)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mailvalid= email.match(mailformat)
    if(mailvalid == null)
    {
        console.log("mail malformated values missing @ or misplaced characters");
        return false;
    }
    else
    {
        console.log("valid email ");
        return true;
    }
}

exports.create=(req,res)=>{
if(!req.body.name)
{
    res.status(400).send({message:"nom obligatoire"});
    return;
}
else if( !validateName(req.body.name))
    {
        res.status(400).send({message:"nom  doit être uniquement des caractéres!"});
        return;
    }
else if(!validatemail(req.body.email))
    {
        res.status(400).send({message:"le mail doit être valide!"});
        return;
    }
    else if(!validateInscription(req.body.inscription))
    {
        res.status(400).send({message:"le numero d'inscription doit etre correcte!"});
        return;
    }

const student =new Students({
    name:req.body.name,
    email:req.body.email,
    inscription:req.body.inscription
});
student.save(student).then((data) => {
   res.send(data) 
}).catch((err) => res.status(500).send(
    { message:err.message||"error while adding"}
))};
exports.findAll = (req, res) => {
    const name = req.query.name; 
      var condition = name
          ? { name: { $regex: new RegExp(name), $options: "i" } }
          : {};
          Students.find(condition).then((data)=>{  
            res.send(data);
                 }).catch((err)=>{
                 res.status(500).send({message:err.message || "erreur lors de la recherche"})
                 })
        }
exports.findById =  (req, res) => {
            Students.findById(req.params.id)
              .then(res.send(data))
              .catch(err => res.status(404).json({ nostudentfound: 'No student found' }));
          };
        
exports.update = (req, res) => {
    if (!req.body) {
    return res.status(400).send({
    message: "Data to update can not be empty!"
    });
    }
    const id = req.params.id;
    students.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot update  with id=${id}. Maybe student was not
   found!`
    });
    } else res.send({ message: "student was updated successfully." });
    })
    .catch(err => {
    res.status(500).send({
    message: "Error updating Tutorial with id=" + id
   });
   });
   };

   exports.delete = (req, res) => {
    const id = req.params.id;
    students.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
    res.status(404).send({
    message: `Cannot delete student with id=${id}. Maybe user was not
   found!`
    });
    } else {
    res.send({
    message: "student was deleted successfully!"
    });
    }
    })
    .catch(err => {
    res.status(500).send({
    message: "Could not delete student with id=" + id
    });
    });
   };
   

