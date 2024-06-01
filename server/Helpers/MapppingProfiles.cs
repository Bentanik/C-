using AutoMapper;
using server.Dto;
using server.Models;

namespace server.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>();
        CreateMap<Brand, BrandDto>();
        CreateMap<BrandDto, Brand>();

        CreateMap<Product, ProductDto>()
           .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
           .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand));

        CreateMap<ProductDto, Product>()
          .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
           .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand));
    }
}