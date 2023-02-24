using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;
using System.Reflection.Metadata;

namespace EmployeeManagement.Api.Models
{
    public enum MaritalStatus { Single=1, Married, Divorced, Widow}
    public class Employee:IdentityUser
    {
        [StringLength(150)]
        public string? HomeAddress { get; set; }
        [StringLength(150)]
        public string? PermanentAddress { get; set; }
        [StringLength(30)]
        public string? Picture { get; set; }
        [EnumDataType(typeof(MaritalStatus))]
        public MaritalStatus? MaritalStatus { get;set; }
        public virtual JobDetail? JobDetail { get; set; } = default!;
       


    }
    public class JobDetail
    {
        [Required, Key,ForeignKey("Employee"), StringLength(450)]
        public string Id { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? JoinDate { get; set; }
        [StringLength(40)]
        public string? Department { get; set; }
        [StringLength(30)]
        public string? CurrentPostion { get; set; }
        public virtual Employee? Employee { get; set; }= default!;
    }
    public class AppDbContext : IdentityDbContext<Employee>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<JobDetail> JobDetails { get; set; }
        
    }
}
