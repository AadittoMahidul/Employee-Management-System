using EmployeeManagement.Api.Models;
using EmployeeManagement.Api.ViewModels;
using EmployeeManagement.Api.ViewModels.data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EmployeeManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly UserManager<Employee> userManager;
        private readonly IWebHostEnvironment env;

        public EmployeesController(AppDbContext db, UserManager<Employee> userManager, IWebHostEnvironment env)
        {
            this.db = db;
            this.userManager = userManager;
            this.env = env;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {

           var data= await db.Users.Include(u=> u.JobDetail).ToListAsync();
            return data;
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<EmployeeViewModel>>> GetEmployeeViewModels()
        {

            var data = await db.Users.Include(u => u.JobDetail).ToListAsync();
            List<EmployeeViewModel> dataVM = new List<EmployeeViewModel>();
            data.ForEach(u =>
            {
                var vm = new EmployeeViewModel
                {
                    Id = u.Id,
                    UserName = u.UserName ?? "",
                    Email = u.Email ?? "",
                    PhoneNumber = u.PhoneNumber ?? "",
                    HomeAddress = u.HomeAddress ?? "",
                    PermanentAddress = u.PermanentAddress ?? "",
                    Picture = u.Picture ?? "",
                    MaritalStatus = u.MaritalStatus,
                    JoinDate = u.JobDetail != null ? u.JobDetail.JoinDate : DateTime.Today,
                    Department = u.JobDetail != null ? u.JobDetail.Department : "",
                    CurrentPostion = u.JobDetail != null ? u.JobDetail.CurrentPostion : ""


                };
                var roles = userManager.GetRolesAsync(u);
                vm.Roles = string.Join(",", roles.Result.ToArray());
                dataVM.Add(vm);
            });
            return  dataVM;

               
                
                
            
        }
        [HttpGet("VM/{username}")]
        public async Task<ActionResult<EmployeeViewModel>> GetEmployeeViewModel(string username) {
            var u = await db.Users.Include(x=> x.JobDetail).Where(x => x.UserName == username).FirstOrDefaultAsync();
                var vm = new EmployeeViewModel
                {
                    Id = u.Id,
                    UserName = u.UserName ?? "",
                    Email = u.Email ?? "",
                    PhoneNumber = u.PhoneNumber ?? "",
                    HomeAddress = u.HomeAddress ?? "",
                    PermanentAddress = u.PermanentAddress ?? "",
                    Picture = u.Picture ?? "",
                    MaritalStatus = u.MaritalStatus,
                    JoinDate = u.JobDetail != null ? u.JobDetail.JoinDate : DateTime.Today,
                    Department = u.JobDetail != null ? u.JobDetail.Department : "",
                    CurrentPostion = u.JobDetail != null ? u.JobDetail.CurrentPostion : ""


                };
            var roles = await userManager.GetRolesAsync(u);
            vm.Roles = string.Join(",", roles.ToArray());
            return vm;
        }
        [HttpPut]
        public async Task<ActionResult<EmployeeViewModel>> PutEmployee(EmployeeViewModel model)
        {
            var u = await db.Users.Include(x => x.JobDetail).Where(x => x.UserName == model.UserName).FirstOrDefaultAsync();
            if (u == null) return NotFound();
            u.Email= model.Email;
            u.PhoneNumber= model.PhoneNumber;
            u.MaritalStatus= model.MaritalStatus;
            u.PhoneNumber=model.PhoneNumber;
            u.JobDetail = u.JobDetail ?? new JobDetail();
            u.JobDetail.JoinDate = model.JoinDate;
            u.JobDetail.Department=model.Department;
            u.JobDetail.CurrentPostion= model.CurrentPostion;
           
            await db.SaveChangesAsync();
            model.Id = model.Id;
            return model;

        }
        [HttpPost("Upload/{username}")]
        public async Task<ActionResult<ImagePathResponse>> PostImage(string username, IFormFile file)
        {
            var u = await db.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
            if (u == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Path.GetFileNameWithoutExtension(Path.GetRandomFileName())+ ext;
                if (!Directory.Exists(env.WebRootPath + "\\Pictures\\"))
                {
                    Directory.CreateDirectory(env.WebRootPath + "\\Pictures\\");
                }
                using FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\Pictures\\" + f);

                file.CopyTo(filestream);
                filestream.Flush();

                filestream.Close();
                u.Picture = f;
                await db.SaveChangesAsync();
                return new ImagePathResponse {SavedImageName=f};

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
