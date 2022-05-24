using Wheelie.Models;

namespace Wheelie.Repositories
{
    public interface IBikerRepository
    {
        List<Biker> GetAllBikers();
        Biker GetByFirebaseUserId(string firebaseUserId);
        void AddBiker(Biker biker);
        void UpdateBiker(Biker biker);
        void DeleteBiker(string firebaseUserId);
    }
}
