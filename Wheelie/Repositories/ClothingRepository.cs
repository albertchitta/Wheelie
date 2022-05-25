using Wheelie.Models;
using Microsoft.Data.SqlClient;

namespace Wheelie.Repositories
{
    public class ClothingRepository : IClothingRepository
    {
        private readonly IConfiguration _config;

        public ClothingRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection
                    (_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Clothing> GetAllClothings()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Jersey,
                                               Goggles,
                                               Shoes,
                                               Other
                                        FROM Clothing";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Clothing> clothings = new List<Clothing>();
                    while (reader.Read())
                    {
                        Clothing clothing = new Clothing
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Jersey = reader.GetString(reader.GetOrdinal("Jersey")),
                            Goggles = reader.GetString(reader.GetOrdinal("Goggles")),
                            Shoes = reader.GetString(reader.GetOrdinal("Shoes")),
                            Other = reader.GetString(reader.GetOrdinal("Other"))
                        };

                        clothings.Add(clothing);
                    }

                    reader.Close();

                    Console.WriteLine(clothings);
                    return clothings;
                }
            }
        }

        public Clothing GetClothingById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Jersey,
                                               Goggles,
                                               Shoes,
                                               Other
                                        FROM Clothing
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Clothing clothing = new Clothing
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Jersey = reader.GetString(reader.GetOrdinal("Jersey")),
                            Goggles = reader.GetString(reader.GetOrdinal("Goggles")),
                            Shoes = reader.GetString(reader.GetOrdinal("Shoes")),
                            Other = reader.GetString(reader.GetOrdinal("Other"))
                        };

                        reader.Close();
                        return clothing;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddClothing(Clothing clothing)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Clothing (Jersey,
                                                              Goggles,
                                                              Shoes,
                                                              Other)
                                        OUTPUT INSERTED.ID
                                        VALUES (@jersey, @goggles, @shoes, @other);";

                    cmd.Parameters.AddWithValue("@jersey", clothing.Jersey);
                    cmd.Parameters.AddWithValue("@goggles", clothing.Goggles);
                    cmd.Parameters.AddWithValue("@shoes", clothing.Shoes);
                    cmd.Parameters.AddWithValue("@other", clothing.Other);

                    int id = (int)cmd.ExecuteScalar();

                    clothing.Id = id;
                }
            }
        }

        public void UpdateClothing(Clothing clothing)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Clothing
                                        SET Jersey = @jersey,
                                            Goggles = @goggles,
                                            Shoes = @shoes,
                                            Other = @other
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", clothing.Id);
                    cmd.Parameters.AddWithValue("@jersey", clothing.Jersey);
                    cmd.Parameters.AddWithValue("@goggles", clothing.Goggles);
                    cmd.Parameters.AddWithValue("@shoes", clothing.Shoes);
                    cmd.Parameters.AddWithValue("@other", clothing.Other);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteClothing(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Clothing
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
