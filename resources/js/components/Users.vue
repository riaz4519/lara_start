<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">User Table</h3>

                        <div class="card-tools">


                            <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus"></i></button>

                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody><tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered at</th>
                                <th>Modify</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id}}</td>
                                <td>{{ user.name}}</td>
                                <td>{{ user.email}}</td>
                                <td><span class="tag tag-success">{{user.type | upText}}</span></td>
                                <td>{{user.created_at | myDate}}</td>
                                <td>
                                    <a href="" @click.prevent="editModal(user)" ><i class="fa fa-edit blue"></i></a>
                                    /
                                    <a href="" @click.prevent="deleteUser(user.id)"> <i class="fa fa-trash red"></i></a>

                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>



        <!--modal-->

        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampaddNew">{{ editMode ? "Update User Info" : "Add New" }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() :createUser()">
                        <div class="modal-body">

                            <div class="form-group">
                                <label>Username</label>
                                <input v-model="form.name" type="text" name="name"
                                       placeholder="Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="email" name="email"
                                       placeholder="Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>

                            <div class="form-group">

                                <textarea v-model="form.bio" id="bio" type="text" name="bio"
                                       placeholder="bio"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                                </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">

                                <select v-model="form.type" id="type"  name="type"

                                       class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">

                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard USer</option>
                                    <option value="author">Author</option>

                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                            <div class="form-group">

                                <input v-model="form.password" id="password" type="password" name="password"
                                       placeholder="password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                            <button v-show="!editMode"type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--end modal-->
    </div>
</template>

<script>
    export default {


        data(){
            return {

                editMode:false,

                form:new Form({

                    'id':'',
                    name:'',
                    email:'',
                    password:'',
                    type:'',
                    bio:'',
                    photo:''

                }),
                users:[],


            }
        },
        methods:{

            updateUser:function () {

                this.$Progress.start();

                this.form.put('/api/user/'+this.form.id)
                    .then(() => {

                    //success
                        swal.fire(
                            'Updated!',
                            'Your Info Updated.',
                            'success'
                        );
                        $('#addNew').modal('hide');
                        Fire.$emit('afterCreate');
                        this.$Progress.finish();
                    })
                    .catch(() => {

                    //fail
                        this.$Progress.fail();

                    });


            },

            newModal:function () {

                this.editMode = false;

                //reset the form

                this.form.reset();

                $('#addNew').modal('show');

            },
            editModal:function (user) {


                this.editMode = true;

                this.form.clear();
                //reset the form

                this.form.fill(user);

                $('#addNew').modal('show');

            },

            deleteUser:function (user_id) {

                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if (result.value){

                    this.form.delete("api/user/"+user_id).then(() =>{



                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        Fire.$emit('afterCreate');


                    }).catch(()=> {

                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Why do I have this issue?</a>'
                        })

                    });

                    }


                })
            },
            
          createUser:function() {

              this.$Progress.start();

              this.form.post('api/user').then(() => {

              Fire.$emit('afterCreate');

              toast.fire({
                  type: 'success',
                  title: 'User Created SuccessFully'
              });


              this.$Progress.finish();

              }).catch();




          },

        loadUser:function () {

              axios.get("api/user").then((response) => {

                 this.users = response.data.data;



              } )

            }
                
            
            
        },
        created(){

            this.loadUser();

            //setInterval(() => this.loadUser(),3000)

            Fire.$on('afterCreate',()=>{

                this.loadUser();

            });


        }



    }
</script>
