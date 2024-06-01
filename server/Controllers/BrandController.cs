using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("/[controller]")]
public class BrandController : ControllerBase
{
    private readonly IBrandRepository _brandRepository;
    private readonly IMapper _mapper;

    public BrandController(IBrandRepository brandRepository, IMapper
 mapper)
    {
        _brandRepository = brandRepository;
        _mapper = mapper;

    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(IEnumerable<Brand>))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> GetBrands()
    {
        var results = _mapper.Map<List<BrandDto>>(await _brandRepository.GetBrands());
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        return Ok(results);
    }

    [HttpGet("getbyid")]
    [ProducesResponseType(200, Type = typeof(Brand))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> GetBrandById([FromQuery] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var result = _mapper.Map<BrandDto>(await _brandRepository.GetBrand(id));
        return Ok(result);
    }

    [HttpPost("createbrand")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateBrand([FromBody] BrandDto BrandDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var isChecked = await _brandRepository.CreateBrand(_mapper.Map<Brand>(BrandDto));
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Create brand successfully" : "Create brand fail"
        };
        return Ok(result);
    }

    [HttpPut("updatebrandbyid")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateBrand([FromBody] BrandDto BrandDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var BrandMap = _mapper.Map<Brand>(BrandDto);
        var isChecked = await _brandRepository.UpdateBrand(BrandMap);
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Update brand successfully" : "Update brand fail"
        };
        return Ok(result);
    }

    [HttpDelete("removebrandbyid")]
    [ProducesResponseType(200, Type = typeof(bool))]
    [ProducesResponseType(400)]
    public async Task<IActionResult> RemoveBrandById([FromQuery] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var isChecked = await _brandRepository.RemoveBrandById(id);
        var result = new
        {
            err = isChecked ? 0 : 1,
            mess = isChecked ? "Remove brand successfully" : "Remove brand fail"
        };
        return Ok(result);
    }
}