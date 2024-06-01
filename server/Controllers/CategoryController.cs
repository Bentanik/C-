using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryController(ICategoryRepository categoryRepository, IMapper
 mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;

    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Category>))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> GetCategories()
    {
        var results = _mapper.Map<List<CategoryDto>>(await _categoryRepository.GetCategories());
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        return Ok(results);
    }

    [HttpGet("getbyid")]
    [ProducesResponseType(200, Type = typeof(Category))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> GetCategoyById([FromQuery] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var result = _mapper.Map<CategoryDto>(await _categoryRepository.GetCategory(id));
        return Ok(result);
    }

    [HttpPost("createcategory")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]

    public async Task<IActionResult> CreateCategory([FromBody] CategoryDto categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var isChecked = await _categoryRepository.CreateCategory(_mapper.Map<Category>(categoryDto));
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Create brand successfully" : "Create brand fail"
        };
        return Ok(result);
    }

    [HttpPut("updatecategorybyid")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]

    public async Task<IActionResult> UpdateCategory([FromBody] CategoryDto categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var categoryMap = _mapper.Map<Category>(categoryDto);
        var isChecked = await _categoryRepository.UpdateCategory(categoryMap);
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Update category successfully" : "Update category fail"
        };
        return Ok(result);
    }

    [HttpDelete("removecategorybyid")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]

    public async Task<IActionResult> RemoveCategoryById([FromQuery] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var isChecked = await _categoryRepository.RemoveCategoryById(id);
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Remove category successfully" : "Remove category fail"
        };
        return Ok(result);
    }
}