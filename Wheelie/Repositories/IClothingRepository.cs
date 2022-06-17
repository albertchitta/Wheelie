using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IClothingRepository
    {
        List<Clothing> GetAllClothings();
        List<Clothing> GetClothingsByBikerId(int id);
        Clothing GetClothingById(int id);
        void AddClothing(Clothing clothing);
        void UpdateClothing(Clothing clothing);
        void DeleteClothing(int id);
    }
}
