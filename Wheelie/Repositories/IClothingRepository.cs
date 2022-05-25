using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IClothingRepository
    {
        List<Clothing> GetAllClothings();
        Clothing GetClothingById(int id);
        void AddClothing(Clothing clothing);
        void UpdateClothing(Clothing clothing);
        void DeleteClothing(int id);
    }
}
