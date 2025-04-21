using FinalExam.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalExam.Controllers;
[Route("[controller]")]
[ApiController]
public class EntertainerController : ControllerBase
{
    private EntertainerDbContext _context;

    public EntertainerController(EntertainerDbContext temp)
    {
        _context = temp;
    }

    [HttpGet("AllEntertainers")]
    public IActionResult GetEntertainers()
    {
        var entertainers = _context.Entertainers.ToList();
        
        return Ok(new {entertainers});
    }

    public class EntertainerBookingSummary
    {
        public int EntertainerID { get; set; }
        public string EntStageName { get; set; }
        public int BookingCount { get; set; }
        public DateTime? MostRecentBookingDate { get; set; }
    }
    
    private static DateTime? TryParseDate(string dateString)
    {
        return DateTime.TryParse(dateString, out var parsed)
            ? parsed
            : null;
    }

    
    [HttpGet("EntertainerInfo")]
    public IActionResult GetEntertainerInfo()
    {
        var data = _context.Entertainers
            .Include(e => e.Engagements)
            .ToList() // 👈 pull into memory
            .Select(e => new EntertainerBookingSummary
            {
                EntertainerID = e.EntertainerID,
                EntStageName = e.EntStageName,
                BookingCount = e.Engagements.Count,
                MostRecentBookingDate = e.Engagements
                    .Select(en => TryParseDate(en.StartDate))
                    .Where(d => d.HasValue)
                    .Max()
            })
            .ToList();

        return Ok(data);
    }

    [HttpGet("EntertainerDetails/{id}")]
    public IActionResult GetEntertainerDetails(int id)
    {
        var data = _context.Entertainers
            .FirstOrDefault(e => e.EntertainerID == id);
        
        return Ok(data);
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteEntertainer(int id)
    {
        var entertainer = _context.Entertainers.FirstOrDefault(e => e.EntertainerID == id);
        if (entertainer == null)
        {
            return NotFound();
        }

        _context.Entertainers.Remove(entertainer);
        _context.SaveChanges();

        return NoContent();
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
    {
        var existing = _context.Entertainers.FirstOrDefault(e => e.EntertainerID == id);
        if (existing == null) return NotFound();

        _context.Entry(existing).CurrentValues.SetValues(updated);
        _context.SaveChanges();

        return NoContent();
    }
    
    [HttpPost]
    public IActionResult AddEntertainer([FromBody] Entertainer entertainer)
    {
        _context.Entertainers.Add(entertainer);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetEntertainerDetails), new { id = entertainer.EntertainerID }, entertainer);
    }


}