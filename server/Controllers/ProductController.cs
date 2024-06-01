using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    private readonly IBrandRepository _brandRepository;

    private readonly IMapper _mapper;

    public ProductController(IProductRepository productRepository, ICategoryRepository categoryRepository, IBrandRepository brandRepository, IMapper
 mapper)
    {
        _brandRepository = brandRepository;
        _categoryRepository = categoryRepository;
        _productRepository = productRepository;
        _mapper = mapper;

    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Products()
    {
        var results = _mapper.Map<List<ProductDto>>(await _productRepository.GetProducts());
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        return Ok(results);
    }

    [HttpGet("getbyid")]
    [ProducesResponseType(200, Type = typeof(Product))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> GetProductById([FromQuery] int id)
    {
        var results = _mapper.Map<ProductDto>(await _productRepository.GetProductById(id));
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        return Ok(results);
    }

    [HttpPost("createproduct")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateProduct([FromQuery] int brandId, int categoryId, [FromBody] ProductDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (!await _categoryRepository.CategoryExists(categoryId))
            return NotFound("Id of category not exists");
        if (!await _brandRepository.BrandExists(brandId))
            return NotFound("Id of brand not exists");

        var isChecked = await _productRepository.CreateProduct(categoryId, brandId, _mapper.Map<Product>(productDto));
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Create product successfully" : "Create product fail"
        };
        return Ok(result);
    }

    [HttpPut("updateproduct")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateProduct([FromQuery] int brandId, int categoryId, [FromBody] ProductDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        if (!await _categoryRepository.CategoryExists(categoryId))
            return NotFound("Id of category not exists");
        if (!await _brandRepository.BrandExists(brandId))
            return NotFound("Id of brand not exists");

        var isChecked = await _productRepository.UpdateProduct(categoryId, brandId, _mapper.Map<Product>(productDto));
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Update product successfully" : "Update product fail"
        };
        return Ok(result);
    }

    [HttpDelete("removeproductbyid")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> RemoveProductById([FromQuery] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var isChecked = await _productRepository.RemoveProductById(id);
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Remove product successfully" : "Remove product fail"
        };
        return Ok(result);
    }
}